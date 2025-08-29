"use client"

import { Modal } from "@/components/Modal/Modal"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function BasicModalExample() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Basic Modal"
        description="This is a basic modal example."
      >
        <div className="space-y-4">
          <p>This is the modal content. You can put any content here.</p>
          <div className="flex gap-2">
            <Button onClick={() => setIsOpen(false)}>Close</Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
