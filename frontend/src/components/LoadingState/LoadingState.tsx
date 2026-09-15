import type { HTMLAttributes } from 'react'

import styles from './LoadingState.module.css'

export type LoadingStateProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  message?: string
}

/*
 * Future implementation: support loading messages, status semantics, optional
 * icons, and lightweight animations for async page and component states.
 */
function LoadingState({ className, message: _message, ...loadingProps }: LoadingStateProps) {
  const classNames = [styles.placeholder, className].filter(Boolean).join(' ')

  return (
    <div className={classNames} {...loadingProps}>
      LoadingState
    </div>
  )
}

export default LoadingState
