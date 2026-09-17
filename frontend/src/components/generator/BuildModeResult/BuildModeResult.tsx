import type { ReactNode } from 'react'

import styles from './BuildModeResult.module.css'

export type BuildModeResultProps = {
  className?: string
  children?: ReactNode
}

/* Future implementation: render the generated bowl with naming, save, edit, and start-new actions. */
function BuildModeResult({ className, children }: BuildModeResultProps) {
  return <div className={[styles.placeholder, className].filter(Boolean).join(' ')}>{children ?? 'BuildModeResult'}</div>
}

export default BuildModeResult
