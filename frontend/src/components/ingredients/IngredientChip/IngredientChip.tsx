import type { HTMLAttributes } from 'react'

import './IngredientChip.module.css'

export type IngredientChipVariant =
  | 'readonly'
  | 'selected'
  | 'addable'
  | 'unavailableSuggestion'

export type IngredientChipProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  variant?: IngredientChipVariant
}

/*
 * Future implementation: render compact ingredient chip variants for readonly,
 * selected, addable, and unavailable AI suggestions. Parent components will
 * provide selection, removal, add, and toggle handlers.
 */
function IngredientChip({ variant: _variant, ..._props }: IngredientChipProps) {
  return <div>IngredientChip</div>
}

export default IngredientChip
