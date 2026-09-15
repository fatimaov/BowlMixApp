import type { HTMLAttributes } from 'react'

import styles from './BowlCarousel.module.css'

export type BowlCarouselProps = HTMLAttributes<HTMLDivElement>

/*
 * Future implementation: render multiple BowlCard items in a responsive
 * carousel or list for Public Demo and Generate Mode results.
 */
function BowlCarousel({ className, ...carouselProps }: BowlCarouselProps) {
  const classNames = [styles.placeholder, className].filter(Boolean).join(' ')

  return (
    <div className={classNames} {...carouselProps}>
      BowlCarousel
    </div>
  )
}

export default BowlCarousel
