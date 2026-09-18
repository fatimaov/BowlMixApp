import type { ReactNode } from 'react'

import './Modal.module.css'

export type ModalProps = {
  isOpen?: boolean
  title?: string
  children?: ReactNode
  onClose?: () => void
  onConfirm?: () => void
  confirmLabel?: string
  cancelLabel?: string
}

/*
 * Future behavior: Modal will be a reusable shared component for confirmation
 * dialogs and form dialogs. It will render the modal overlay, modal card, title,
 * close X button, content area, and optional action buttons. The parent
 * component will control whether the modal is open and pass modal content
 * through children, which may be text, a form, icons, warnings, or any custom
 * JSX. The parent will pass onClose for closing/cancel behavior and may pass
 * onConfirm for actions such as saving an edited ingredient, deleting an
 * account, editing a bowl name, or confirming navigation away. The modal should
 * eventually support configurable labels like confirmLabel and cancelLabel,
 * along with a confirm button variant for destructive actions.
 */
function Modal(_props: ModalProps) {
  return <div>Modal</div>
}

export default Modal
