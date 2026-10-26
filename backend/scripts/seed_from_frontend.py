#!/usr/bin/env python3
"""Seed the database with authentic verified institutional data from the frontend files.
Prevents duplicate records and maintains exact factual accuracy.
"""
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app.db.session import SessionLocal
from app.models.department import Department
from app.models.programme import Programme
from app.models.news import NewsArticle
from app.models.gallery import GalleryItem
from app.models.settings import SiteSetting

# Authentic Departments
DEPARTMENTS_DATA = [
    {
        "id": "dept-cs",
        "name": "Department of Computer Science",
        "slug": "computer-science",
        "code": "CS",
        "category": "Science",
        "overview": "Nurturing foundational and applied computing competencies with hands-on computer lab facilities and software development practicals.",
        "display_order": 1,
    },
    {
        "id": "dept-maths",
        "name": "Department of Mathematics",
        "slug": "mathematics",
        "code": "MATH",
        "category": "Science",
        "overview": "Fostering analytical acumen, theoretical inquiry, and numerical discipline across pure and applied mathematical frameworks.",
        "display_order": 2,
    },
    {
        "id": "dept-commerce",
        "name": "Department of Commerce",
        "slug": "commerce",
        "code": "COM",
        "category": "Commerce & Management",
        "overview": "Delivering grounded education in corporate accounting, financial systems, banking regulations, and commercial law.",
        "display_order": 3,
    },
    {
        "id": "dept-management",
        "name": "Department of Management Studies",
        "slug": "management-studies",
        "code": "BBA",
        "category": "Commerce & Management",
        "overview": "Equipping students with modern managerial methods, decision analysis, organizational communication, and leadership skills.",
        "display_order": 4,
    },
    {
        "id": "dept-tamil",
        "name": "Department of Tamil",
        "slug": "tamil",
        "code": "TAM",
        "category": "Languages",
        "overview": "Cultivating classical literary appreciation, cultural heritage, and linguistic proficiency in the Tamil language.",
        "display_order": 5,
    },
    {
        "id": "dept-english",
        "name": "Department of English",
        "slug": "english",
        "code": "ENG",
        "category": "Languages",
        "overview": "Promoting professional communication skills, literary analysis, and fluency in global and corporate English.",
        "display_order": 6,
    },
]

# Authentic Programmes
PROGRAMMES_DATA = [
    {
        "id": "prog-bsc-cs",
        "department_id": "dept-cs",
        "name": "B.Sc Computer Science",
        "slug": "computer-science",
        "degree": "Bachelor of Science (B.Sc)",
        "level": "UG",
        "duration_years": 3,
        "description": "Foundational computer science education covering computing principles, programming paradigms, and software systems.",
        "admission_info": "Eligibility: Higher Secondary (+2) with Mathematics / Computer Science.",
        "display_order": 1,
    },
    {
        "id": "prog-bsc-maths",
        "department_id": "dept-maths",
        "name": "B.Sc Mathematics",
        "slug": "mathematics",
        "degree": "Bachelor of Science (B.Sc)",
        "level": "UG",
        "duration_years": 3,
        "description": "Rigorous mathematical training in pure and applied mathematics, analytical problem-solving, and mathematical modeling.",
        "admission_info": "Eligibility: Higher Secondary (+2) with Mathematics.",
        "display_order": 2,
    },
    {
        "id": "prog-bcom-gen",
        "department_id": "dept-commerce",
        "name": "B.Com (Bachelor of Commerce)",
        "slug": "bcom",
        "degree": "Bachelor of Commerce (B.Com)",
        "level": "UG",
        "duration_years": 3,
        "description": "Comprehensive business, financial accounting, taxation, and commercial management education.",
        "admission_info": "Eligibility: Higher Secondary (+2) with Commerce / Accountancy stream.",
        "display_order": 3,
    },
    {
        "id": "prog-bcom-cs",
        "department_id": "dept-commerce",
        "name": "B.Com Corporate Secretaryship",
        "slug": "corporate-secretaryship",
        "degree": "Bachelor of Commerce (B.Com CS)",
        "level": "UG",
        "duration_years": 3,
        "description": "Specialized corporate governance, corporate law, secretarial practice, and managerial operations training.",
        "admission_info": "Eligibility: Higher Secondary (+2) with Commerce / Accountancy / Business stream.",
        "display_order": 4,
    },
    {
        "id": "prog-bba",
        "department_id": "dept-management",
        "name": "BBA - Bachelor of Business Administration",
        "slug": "bba",
        "degree": "Bachelor of Business Administration (BBA)",
        "level": "UG",
        "duration_years": 3,
        "description": "Hands-on management training emphasizing business administration, marketing, organisational strategy, and leadership.",
        "admission_info": "Eligibility: Higher Secondary (+2) in any recognized stream.",
        "display_order": 5,
    },
    {
        "id": "prog-mcom",
        "department_id": "dept-commerce",
        "name": "M.Com (Master of Commerce)",
        "slug": "mcom",
        "degree": "Master of Commerce (M.Com)",
        "level": "PG",
        "duration_years": 2,
        "description": "Advanced postgraduate inquiry into corporate finance, accounting theory, research methodology, and international business.",
        "admission_info": "Eligibility: Recognized Bachelor's degree in Commerce or Corporate Secretaryship.",
        "display_order": 6,
    },
]

# Authentic News Articles
NEWS_DATA = [
    {
        "id": "news-nss-camp",
        "title": "NSS Unit Completes Seven-Day Special Camp in Vadamavandal",
        "slug": "nss-special-camp-vadamavandal",
        "category": "Camp",
        "publication_date": "Recent",
        "summary": "College National Service Scheme (NSS) volunteers organized community welfare and civic awareness initiatives across Vadamavandal.",
        "content": "Student volunteers of A.N. Radhakrishnan College of Arts & Science successfully carried out a comprehensive seven-day special village camp in Vadamavandal. Under the supervision of college faculty program officers, volunteers engaged in rural sanitation drives, health and hygiene awareness campaigns, tree sapling distribution, and local community outreach. The annual NSS camp reflects the college's foundational commitment to civic responsibility, rural upliftment, and active student citizenship.",
        "is_published": True,
    },
    {
        "id": "news-symposium",
        "title": "Inter-Departmental Symposium Hosted at ANR College",
        "slug": "inter-departmental-symposium",
        "category": "Academics",
        "publication_date": "Recent",
        "summary": "Students presented technical and commerce papers highlighting emerging trends in computing, economics, and business practice.",
        "content": "The Departments of Computer Science and Commerce organized an inter-departmental academic symposium on campus. Students presented seminar papers covering software problem-solving, corporate accounting frameworks, and business management applications. Faculty mentors commended the analytical rigor and practical presentation skills demonstrated by participating student teams.",
        "is_published": True,
    },
    {
        "id": "news-sports-meet",
        "title": "Annual Inter-Departmental Sports & Athletics Meet Held",
        "slug": "annual-sports-athletics-meet",
        "category": "Event",
        "publication_date": "Recent",
        "summary": "Students from across science, commerce, and language departments participated in track events, volleyball, and athletic contests.",
        "content": "ANRCAS held its annual inter-departmental athletic meet on the college sports grounds. The event featured track competitions, volleyball tournaments, and team fitness challenges, fostering camaraderie, healthy sportsmanship, and physical discipline among students across all departments.",
        "is_published": True,
    },
    {
        "id": "news-welfare",
        "title": "Social Welfare & Health Awareness Programme Conducted",
        "slug": "social-welfare-awareness-programme",
        "category": "Event",
        "publication_date": "Recent",
        "summary": "Interactive awareness sessions focused on community wellbeing and civic responsibility organized on campus.",
        "content": "A special campus awareness programme addressing youth health, civic discipline, and social welfare was conducted in the college seminar hall. Attended by undergraduate students and faculty members, the session emphasized balanced lifestyle habits, personal responsibility, and community values.",
        "is_published": True,
    },
]

# Authentic Gallery Items
GALLERY_DATA = [
    {
        "id": "campus-grounds",
        "title": "Main Campus Entrance & College Grounds",
        "category": "Campus Grounds",
        "image_url": "/assets/campus_main.webp",
        "alt_text": "Main entrance arch and administrative academic block at ANRCAS campus in Vadamavandal",
        "caption": "Serene academic environment and campus premises situated peacefully along Vadamavandal Road.",
        "is_featured": True,
        "display_order": 1,
        "is_published": True,
    },
    {
        "id": "seminar-hall",
        "title": "National Academic Symposium & Seminar Hall",
        "category": "Academic Life",
        "image_url": "/assets/gallery_seminar.webp",
        "alt_text": "Faculty, keynote presenters, and students participating in an academic symposium at ANRCAS",
        "caption": "Scholars, keynote speakers, and faculty members delivering collegiate presentations and guest lectures.",
        "is_featured": False,
        "display_order": 2,
        "is_published": True,
    },
    {
        "id": "computer-laboratory",
        "title": "Computer Science Practical Systems Lab",
        "category": "Technology Labs",
        "image_url": "/assets/lab_students.webp",
        "alt_text": "Students working at individual desktop workstations during computing laboratory practicals",
        "caption": "Dedicated hands-on software development and digital literacy sessions in the networked computing lab.",
        "is_featured": False,
        "display_order": 3,
        "is_published": True,
    },
    {
        "id": "central-library",
        "title": "Central Reading Room & Reference Library",
        "category": "Academic Life",
        "image_url": "/assets/library_students.webp",
        "alt_text": "Students studying at central library tables with reference book stacks in the background",
        "caption": "Quiet collaborative study sessions supported by comprehensive university reference collections.",
        "is_featured": False,
        "display_order": 4,
        "is_published": True,
    },
    {
        "id": "sports-meet",
        "title": "Annual Sports & Athletic Events",
        "category": "Sports & Athletics",
        "image_url": "/assets/gallery_sports.webp",
        "alt_text": "Students and athletes gathered on the college grounds during sports activities and competitions",
        "caption": "Inter-departmental track events and athletic tournaments fostering teamwork, discipline, and physical vigor.",
        "is_featured": False,
        "display_order": 5,
        "is_published": True,
    },
    {
        "id": "cultural-celebrations",
        "title": "Pongal Festival & Cultural Celebrations",
        "category": "Campus Culture",
        "image_url": "/assets/gallery_cultural.webp",
        "alt_text": "Students performing on the college auditorium stage during traditional cultural celebrations",
        "caption": "Traditional Tamil cultural celebrations, music, folk dance performances, and community harmony.",
        "is_featured": False,
        "display_order": 6,
        "is_published": True,
    },
]

# Official Institutional Settings
SETTINGS_DATA = [
    ("college_name", "A.N. Radhakrishnan College of Arts & Science", "Official institution name", True),
    ("short_name", "ANRCAS", "Short acronym", True),
    ("affiliation", "Affiliated to Thiruvalluvar University, Vellore", "Accreditation and university affiliation", True),
    ("primary_phone", "+91 8939804020", "Main admission & administration helpline", True),
    ("landline", "04182-247518", "Campus administrative landline", True),
    ("email", "admin@anrcas.edu.in", "Official correspondence email", True),
    ("address_locality", "Vadamavandal", "Campus locality", True),
    ("address_state", "Tamil Nadu", "State jurisdiction", True),
    ("campus_notice", "ADMISSIONS 2026–2027: Application portals active for UG & PG Degree Programmes.", "Top banner broadcast alert", True),
    ("admissions_active", "true", "Flag indicating whether admission intake is currently active", True),
]


def seed_database():
    db = SessionLocal()
    try:
        # 1. Departments
        dept_count = 0
        for d in DEPARTMENTS_DATA:
            existing = db.query(Department).filter(Department.id == d["id"]).first()
            if not existing:
                dept = Department(**d)
                db.add(dept)
                dept_count += 1
        db.commit()
        print(f"Departments: {dept_count} added.")

        # 2. Programmes
        prog_count = 0
        for p in PROGRAMMES_DATA:
            existing = db.query(Programme).filter(Programme.id == p["id"]).first()
            if not existing:
                prog = Programme(**p)
                db.add(prog)
                prog_count += 1
        db.commit()
        print(f"Programmes: {prog_count} added.")

        # 3. News Articles
        news_count = 0
        for n in NEWS_DATA:
            existing = db.query(NewsArticle).filter(NewsArticle.id == n["id"]).first()
            if not existing:
                article = NewsArticle(**n)
                db.add(article)
                news_count += 1
        db.commit()
        print(f"News Articles: {news_count} added.")

        # 4. Gallery Items
        gal_count = 0
        for g in GALLERY_DATA:
            existing = db.query(GalleryItem).filter(GalleryItem.id == g["id"]).first()
            if not existing:
                item = GalleryItem(**g)
                db.add(item)
                gal_count += 1
        db.commit()
        print(f"Gallery Items: {gal_count} added.")

        # 5. Site Settings
        setting_count = 0
        for key, val, desc, is_pub in SETTINGS_DATA:
            existing = db.query(SiteSetting).filter(SiteSetting.key == key).first()
            if not existing:
                setting = SiteSetting(key=key, value=val, description=desc, is_public=is_pub)
                db.add(setting)
                setting_count += 1
        db.commit()
        print(f"Site Settings: {setting_count} added.")

        print("\nDatabase seed completed successfully with verified institutional data!")
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
