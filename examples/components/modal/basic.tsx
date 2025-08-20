import { Modal } from "@/components/Modal/Modal"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Example() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="space-y-2">
        <Button onClick={() => setIsOpen(true)}>Open Demo Modal</Button>
        <div className="text-xs text-muted-foreground">Click to see modal with all features</div>
      </div>

      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title="Demo Modal"
        description="This is a live preview of the Modal component"
        size="lg"
        position="center"
      >
        <div className="space-y-4">
          <p>This modal demonstrates the component working in the preview!</p>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
