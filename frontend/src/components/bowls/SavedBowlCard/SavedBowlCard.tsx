import type { HTMLAttributes } from 'react'

import './SavedBowlCard.module.css'

export type SavedBowlCardProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'>

/*
 * Future implementation: render a compact saved bowl item for the Saved Bowls
 * page. This differs from BowlCard, which is used for generated result/detail
 * cards. It should eventually show the saved bowl title, edit-name icon/action,
 * saved/favorite heart icon, and compact readonly ingredient chips. It may
 * reuse IngredientChip with a readonly variant for ingredient display. The
 * component should stay compact and should not include the full result-card
 * layout. BowlFingerprint is not required for MVP unless the design later
 * needs it.
 */
function SavedBowlCard(_props: SavedBowlCardProps) {
  return <div>SavedBowlCard</div>
}

export default SavedBowlCard
