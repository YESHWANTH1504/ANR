import { useCallback, useState } from 'react'

export interface UseDisclosureReturn {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onToggle: () => void
  setOpen: (open: boolean) => void
}

export function useDisclosure(initialState = false): UseDisclosureReturn {
  const [isOpen, setOpen] = useState(initialState)

  const onOpen = useCallback(() => setOpen(true), [])
  const onClose = useCallback(() => setOpen(false), [])
  const onToggle = useCallback(() => setOpen((prev) => !prev), [])

  return { isOpen, onOpen, onClose, onToggle, setOpen }
}
