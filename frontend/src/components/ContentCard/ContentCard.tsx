import type { HTMLAttributes, ReactNode } from 'react'

import styles from './ContentCard.module.css'

export type ContentCardProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  children?: ReactNode
}

/*
 * Future implementation: provide reusable card spacing, background, radius,
 * and layout containment for auth, profile, demo, and other content areas.
 */
function ContentCard({ children: _children, className, ...cardProps }: ContentCardProps) {
  const classNames = [styles.placeholder, className].filter(Boolean).join(' ')

  return (
    <div className={classNames} {...cardProps}>
      ContentCard
    </div>
  )
}

export default ContentCard
