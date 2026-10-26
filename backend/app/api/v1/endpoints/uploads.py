import os
import uuid
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status
from app.core.config import settings
from app.models.admin import Administrator
from app.api.deps import get_current_admin

router = APIRouter()


def validate_image_content(contents: bytes, ext: str) -> None:
    """Validate raw file bytes against magic byte signatures for PNG, JPEG, and WEBP."""
    if len(contents) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Uploaded file is empty."
        )

    if ext in ("jpg", "jpeg"):
        if not contents.startswith(b"\xff\xd8\xff"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="File content does not match a valid JPEG image signature."
            )
    elif ext == "png":
        if not contents.startswith(b"\x89PNG\r\n\x1a\n"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="File content does not match a valid PNG image signature."
            )
    elif ext == "webp":
        if not (contents.startswith(b"RIFF") and len(contents) > 12 and contents[8:12] == b"WEBP"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="File content does not match a valid WEBP image signature."
            )
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported image type: .{ext}"
        )


@router.post("", status_code=status.HTTP_201_CREATED)
async def upload_image(
    file: UploadFile = File(...),
    current_admin: Administrator = Depends(get_current_admin)
):
    """Admin: Upload an image file for news or gallery items with content signature verification."""
    filename = file.filename or ""
    ext = filename.split(".")[-1].lower() if "." in filename else ""
    if ext not in settings.allowed_extensions:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid file extension. Allowed: {', '.join(settings.allowed_extensions)}"
        )

    # Verify declared Content-Type begins with image/
    content_type = (file.content_type or "").lower()
    if content_type and not content_type.startswith("image/"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid Content-Type '{content_type}'. Must be an image MIME type."
        )

    contents = await file.read()
    max_bytes = settings.MAX_UPLOAD_SIZE_MB * 1024 * 1024
    if len(contents) > max_bytes:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File exceeds maximum size of {settings.MAX_UPLOAD_SIZE_MB}MB"
        )

    # Deep inspection of magic bytes
    validate_image_content(contents, ext)

    upload_dir = os.path.abspath(settings.abs_upload_dir)
    os.makedirs(upload_dir, exist_ok=True)
    
    safe_filename = f"{uuid.uuid4().hex}.{ext}"
    dest_path = os.path.abspath(os.path.join(upload_dir, safe_filename))

    # Defensive path traversal check
    if not dest_path.startswith(upload_dir):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid file path."
        )

    with open(dest_path, "wb") as f:
        f.write(contents)

    return {
        "filename": safe_filename,
        "url": f"/uploads/{safe_filename}",
        "size_bytes": len(contents)
    }
