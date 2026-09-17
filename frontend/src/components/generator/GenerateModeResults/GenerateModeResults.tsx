import type { ReactNode } from 'react'

import styles from './GenerateModeResults.module.css'

export type GenerateModeResultsProps = {
  className?: string
  children?: ReactNode
}

/* Future implementation: render three bowl suggestions with naming and independent save actions. */
function GenerateModeResults({ className, children }: GenerateModeResultsProps) {
  return <div className={[styles.placeholder, className].filter(Boolean).join(' ')}>{children ?? 'GenerateModeResults'}</div>
}

export default GenerateModeResults
