import { useState } from 'react'
import type { Park } from '../config/parks.types'

export function useParkSelection(initialPark: Park) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPark, setSelectedPark] = useState<Park>(initialPark)

  const toggle = () => setIsOpen((s) => !s);
  const selectPark = (park: Park) => {
    setSelectedPark(park)
    setIsOpen(false)
  }

  return { isOpen, selectedPark, toggle, selectPark }
}
