import { Modal } from "@/components/Modal/Modal"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function AdvancedExample() {
  const [basicModal, setBasicModal] = useState(false)
  const [largeModal, setLargeModal] = useState(false)
  const [restrictedModal, setRestrictedModal] = useState(false)

  return (
    <div className="space-y-4">
      {/* Basic Modal */}
      <Button onClick={() => setBasicModal(true)}>
        Basic Modal
      </Button>
      <Modal
        open={basicModal}
        onClose={() => setBasicModal(false)}
        title="Basic Modal"
        description="A simple modal with default settings"
      >
        <div className="space-y-4">
          <p>This is a basic modal with all default behaviors enabled.</p>
          <div className="flex gap-2 justify-end">
            <Button onClick={() => setBasicModal(false)}>Close</Button>
          </div>
        </div>
      </Modal>

      {/* Large Modal */}
      <Button onClick={() => setLargeModal(true)} variant="outline">
        Large Modal
      </Button>
      <Modal
        open={largeModal}
        onClose={() => setLargeModal(false)}
        title="Large Modal"
        description="A large modal with custom content"
        size="2xl"
        position="top"
      >
        <div className="space-y-4">
          <p>This is a large modal positioned at the top.</p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setLargeModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => setLargeModal(false)}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>

      {/* Restricted Modal */}
      <Button onClick={() => setRestrictedModal(true)} variant="destructive">
        Restricted Modal
      </Button>
      <Modal
        open={restrictedModal}
        onClose={() => setRestrictedModal(false)}
        title="Restricted Modal"
        description="No close button, outside click, or ESC key closing"
        showCloseButton={false}
        closeOnOutsideClick={false}
        closeOnEsc={false}
      >
        <div className="space-y-4">
          <p>This modal can only be closed using the button below.</p>
          <div className="flex justify-center">
            <Button onClick={() => setRestrictedModal(false)}>
              Close Modal (Only Way)
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}