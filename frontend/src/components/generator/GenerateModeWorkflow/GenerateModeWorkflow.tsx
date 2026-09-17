import type { ReactNode } from 'react'

import styles from './GenerateModeWorkflow.module.css'

export type GenerateModeWorkflowProps = {
  className?: string
  children?: ReactNode
}

/* Future implementation: own Generate Mode constraints, loading, results, regeneration, and restart state. */
function GenerateModeWorkflow({ className, children }: GenerateModeWorkflowProps) {
  return <div className={[styles.placeholder, className].filter(Boolean).join(' ')}>{children ?? 'GenerateModeWorkflow'}</div>
}

export default GenerateModeWorkflow
