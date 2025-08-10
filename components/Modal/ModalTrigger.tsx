'use client'

import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'

import { Button, type ButtonProps } from '@/components/ui/button'
import { Modal, type ModalProps } from './Modal'

interface ModalTriggerProps
  extends Omit<ModalProps, 'open' | 'onClose' | 'children'>,
    Omit<VariantProps<typeof Button>, 'size'> {
  trigger: React.ReactNode
  children?: React.ReactNode
  renderContent?: (props: { onClose: () => void }) => React.ReactNode
  buttonProps?: ButtonProps
  passCloseToChildren?: boolean
  onOpen?: () => void
  onClose?: () => void
}

export function ModalTrigger({
  trigger,
  children,
  title,
  description,
  position,
  size,
  showCloseButton,
  closeOnOutsideClick,
  closeOnEsc,
  className,
  contentClassName,
  buttonProps,
  renderContent,
  onOpen,
  onClose,
}: ModalTriggerProps) {
  const [open, setOpen] = React.useState(false)

  const handleOpen = React.useCallback(() => {
    setOpen(true)
    onOpen?.()
  }, [onOpen])

  const handleClose = React.useCallback(() => {
    setOpen(false)
    onClose?.()
  }, [onClose])

  // Render children with onClose prop if needed
  const renderChildren = () => {
    if (renderContent) {
      return renderContent({ onClose: handleClose })
    }

    // Default: render children as-is
    return children
  }

  return (
    <>
      {React.isValidElement(trigger) ? (
        React.cloneElement(
          trigger as React.ReactElement<{ onClick?: () => void }>,
          {
            onClick: handleOpen,
          }
        )
      ) : (
        <Button onClick={handleOpen} {...buttonProps}>
          {trigger}
        </Button>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        title={title}
        description={description}
        position={position}
        size={size}
        showCloseButton={showCloseButton}
        closeOnOutsideClick={closeOnOutsideClick}
        closeOnEsc={closeOnEsc}
        className={className}
        contentClassName={contentClassName}
      >
        {renderChildren()}
      </Modal>
    </>
  )
}

ModalTrigger.displayName = 'ModalTrigger'
