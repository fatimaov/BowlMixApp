import type { ReactNode } from 'react'

import styles from './InfoBox.module.css'

export type InfoBoxProps = {
  children?: ReactNode
}

/*
 * Future behavior: InfoBox will be a reusable small contextual information
 * box for helper or explanatory content inside forms and pages. It will likely
 * appear in BuildModeForm and GenerateModeForm with a small background,
 * border, padding, and rounded corners. The parent will provide the content
 * through children so each mode can use different text without hardcoding
 * mode-specific logic inside InfoBox.
 */
function InfoBox({ children: _children }: InfoBoxProps) {
  return <div className={styles.placeholder}>InfoBox</div>
}

export default InfoBox
