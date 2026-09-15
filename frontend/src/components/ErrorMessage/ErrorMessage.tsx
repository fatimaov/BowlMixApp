import styles from './ErrorMessage.module.css'

export type ErrorMessageProps = {
  message?: string
}

/*
 * Future implementation: render reusable box-style error feedback for forms,
 * generation errors, save errors, and other page-level error states.
 */
function ErrorMessage({ message: _message }: ErrorMessageProps) {
  return <div className={styles.placeholder}>ErrorMessage</div>
}

export default ErrorMessage
