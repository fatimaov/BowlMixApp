import type { HTMLAttributes } from 'react'

import styles from './BowlCard.module.css'

export type BowlCardProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  title?: string
}

/*
 * Future implementation: display generated or saved bowl names, fingerprints,
 * grouped ingredients, and actions that vary by bowl mode.
 */
function BowlCard({ className, title: _title, ...cardProps }: BowlCardProps) {
  const classNames = [styles.placeholder, className].filter(Boolean).join(' ')

  return (
    <div className={classNames} {...cardProps}>
      BowlCard
    </div>
  )
}

export default BowlCard
