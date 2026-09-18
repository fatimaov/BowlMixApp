import styles from './GeneratedBowlResult.module.css'

export type GeneratedBowlResultProps = {
  className?: string
}

/*
 * Future implementation: this shared behavior wrapper will own one temporary
 * generated bowl result between its parent result section and BowlCard.
 *
 * It will be used by authenticated Build Mode and Generate Mode results, but
 * not by Public Demo results because Public Demo bowls cannot be renamed or
 * saved. It should eventually own editedName, isSaving, isSaved, and saveError;
 * handle editing the generated bowl name; call the save bowl request to create
 * a saved bowl snapshot; and, after a successful save, lock the result so its
 * name cannot be edited and it cannot be saved again. It will pass display
 * props and callbacks down to BowlCard.
 */
function GeneratedBowlResult({ className }: GeneratedBowlResultProps) {
  const classNames = [styles.placeholder, className].filter(Boolean).join(' ')

  return (
    <div className={classNames}>
      GeneratedBowlResult
    </div>
  )
}

export default GeneratedBowlResult
