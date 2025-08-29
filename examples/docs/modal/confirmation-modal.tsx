"use client"

import { Modal } from "@/components/Modal/Modal"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function ConfirmationModalExample() {
  const [confirmOpen, setConfirmOpen] = useState(false)

  return (
    <div>
      <Button variant="destructive" onClick={() => setConfirmOpen(true)}>
        Delete Item
      </Button>
      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Confirm Deletion"
        description="Are you sure you want to delete this item? This action cannot be undone."
        size="sm"
      >
        <div className="flex gap-2 mt-4">
          <Button
            variant="destructive"
            onClick={() => {
              alert("Item deleted!")
              setConfirmOpen(false)
            }}
          >
            Delete
          </Button>
          <Button variant="outline" onClick={() => setConfirmOpen(false)}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  )
}
