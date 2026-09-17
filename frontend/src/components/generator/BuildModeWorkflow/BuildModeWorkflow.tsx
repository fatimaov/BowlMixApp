import type { ReactNode } from 'react'

import styles from './BuildModeWorkflow.module.css'

export type BuildModeWorkflowProps = {
  className?: string
  children?: ReactNode
}

/* Future implementation: own Build Mode form, loading, result, edit, and start-new workflow state. */
function BuildModeWorkflow({ className, children }: BuildModeWorkflowProps) {
  return <div className={[styles.placeholder, className].filter(Boolean).join(' ')}>{children ?? 'BuildModeWorkflow'}</div>
}

export default BuildModeWorkflow
