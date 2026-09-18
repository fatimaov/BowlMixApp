import type { HTMLAttributes } from 'react'

import './IngredientRow.module.css'

export type IngredientRowProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'>

/*
 * Future implementation: render an ingredient row for IngredientSelectionModal
 * with availability styling, an availability toggle, add action, and disabled
 * or already-selected states.
 */
function IngredientRow(_props: IngredientRowProps) {
  return <div>IngredientRow</div>
}

export default IngredientRow
