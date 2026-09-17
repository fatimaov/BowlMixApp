import type { ReactNode } from 'react'

import styles from './BuildModeForm.module.css'

export type BuildModeFormProps = {
  className?: string
  children?: ReactNode
}

/* Future implementation: render category-based manual ingredient selection and AI pairing entry points. */
function BuildModeForm({ className, children }: BuildModeFormProps) {
  return <div className={[styles.placeholder, className].filter(Boolean).join(' ')}>{children ?? 'BuildModeForm'}</div>
}

export default BuildModeForm
