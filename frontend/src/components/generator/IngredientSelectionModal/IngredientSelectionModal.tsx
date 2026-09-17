import type { ReactNode } from 'react'

import styles from './IngredientSelectionModal.module.css'

export type IngredientSelectionModalProps = {
  className?: string
  children?: ReactNode
}

/* Future implementation: provide reusable category selection with mode-specific rules supplied through props. */
function IngredientSelectionModal({ className, children }: IngredientSelectionModalProps) {
  return <div className={[styles.placeholder, className].filter(Boolean).join(' ')}>{children ?? 'IngredientSelectionModal'}</div>
}

export default IngredientSelectionModal
