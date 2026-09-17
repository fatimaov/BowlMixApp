import type { ReactNode } from 'react'

import styles from './GenerateModeForm.module.css'

export type GenerateModeFormProps = {
  className?: string
  children?: ReactNode
}

/* Future implementation: render locked ingredients, excluded ingredients, and category selection flows. */
function GenerateModeForm({ className, children }: GenerateModeFormProps) {
  return <div className={[styles.placeholder, className].filter(Boolean).join(' ')}>{children ?? 'GenerateModeForm'}</div>
}

export default GenerateModeForm
