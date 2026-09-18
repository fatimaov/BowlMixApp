import type { HTMLAttributes } from 'react'

import './IngredientManagementItem.module.css'

export type IngredientManagementItemProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'>

/*
 * Future implementation: render a My Ingredients item with a category color
 * dot, ingredient name, category label, availability toggle, edit action, and
 * delete action.
 */
function IngredientManagementItem(_props: IngredientManagementItemProps) {
  return <div>IngredientManagementItem</div>
}

export default IngredientManagementItem
