import type { InputHTMLAttributes } from 'react'

import styles from './SearchInput.module.css'

export type SearchInputProps = InputHTMLAttributes<HTMLInputElement>

/* Future implementation: provide a reusable ingredient search field for modal and My Ingredients filtering. */
function SearchInput({ className, ...inputProps }: SearchInputProps) {
  return <input className={[styles.placeholder, className].filter(Boolean).join(' ')} placeholder="SearchInput" {...inputProps} />
}

export default SearchInput
