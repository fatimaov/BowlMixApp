import type { HTMLAttributes } from 'react'

import styles from './BowlCard.module.css'

export type BowlCardProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  title?: string
}

/*
 * BowlCard should stay mostly visual. Future props will drive rendering of the
 * bowl name, fingerprint, ingredients, save/edit UI, saving state, saved
 * overlay, and errors. It should not own API request logic and should support
 * non-interactive Public Demo display through props such as canEditName and
 * canSave.
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
