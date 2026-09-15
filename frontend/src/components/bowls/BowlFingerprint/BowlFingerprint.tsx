import type { HTMLAttributes } from 'react'

import styles from './BowlFingerprint.module.css'

export type BowlFingerprintProps = HTMLAttributes<HTMLDivElement>

/*
 * Future implementation: render the visual bowl composition system from
 * category color keys, shape families, and ingredient visual pattern keys.
 */
function BowlFingerprint({ className, ...fingerprintProps }: BowlFingerprintProps) {
  const classNames = [styles.placeholder, className].filter(Boolean).join(' ')

  return (
    <div className={classNames} {...fingerprintProps}>
      BowlFingerprint
    </div>
  )
}

export default BowlFingerprint
