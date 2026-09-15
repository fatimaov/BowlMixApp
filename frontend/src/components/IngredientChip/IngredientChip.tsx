import type { HTMLAttributes } from 'react'

import styles from './IngredientChip.module.css'

export type IngredientChipProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  label?: string
}

/*
 * Future implementation: support category styling, availability, selected and
 * disabled states, plus readonly ingredient display.
 */
function IngredientChip({ className, label: _label, ...chipProps }: IngredientChipProps) {
  const classNames = [styles.placeholder, className].filter(Boolean).join(' ')

  return (
    <span className={classNames} {...chipProps}>
      IngredientChip
    </span>
  )
}

export default IngredientChip
