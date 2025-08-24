"use client"

import { Modal } from "@/components/Modal/Modal"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function LargeModalExample() {
  const [largeOpen, setLargeOpen] = useState(false)

  return (
    <div>
      <Button onClick={() => setLargeOpen(true)}>Open Large Modal</Button>
      <Modal
        open={largeOpen}
        onClose={() => setLargeOpen(false)}
        title="Large Modal"
        size="2xl"
      >
        <div className="space-y-4">
          <p>This is a large modal with more space for content.</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded">Column 1</div>
            <div className="p-4 bg-muted rounded">Column 2</div>
          </div>
          <Button onClick={() => setLargeOpen(false)}>Close</Button>
        </div>
      </Modal>
    </div>
  )
}