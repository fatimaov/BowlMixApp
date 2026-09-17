import type { ReactNode } from 'react'

import styles from './GenerationModeTabs.module.css'

export type GenerationModeTabsProps = {
  className?: string
  children?: ReactNode
}

/* Future implementation: manage the selected build or generate mode and expose mode changes to the dashboard. */
function GenerationModeTabs({ className, children }: GenerationModeTabsProps) {
  return <div className={[styles.placeholder, className].filter(Boolean).join(' ')}>{children ?? 'GenerationModeTabs'}</div>
}

export default GenerationModeTabs
