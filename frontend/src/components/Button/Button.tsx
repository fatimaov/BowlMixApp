import type { ButtonHTMLAttributes, ReactNode } from 'react'

import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ai'
type ButtonSize = 'L' | 'M' | 'S'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  icon?: ReactNode
  size?: ButtonSize
  variant?: ButtonVariant
}

const variantClassNames: Record<ButtonVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  tertiary: styles.tertiary,
  ai: styles.ai,
}

const sizeClassNames: Record<ButtonSize, string> = {
  L: styles.sizeL,
  M: styles.sizeM,
  S: styles.sizeS,
}

function Button({
  children,
  className,
  icon,
  size = 'M',
  type = 'button',
  variant = 'primary',
  ...buttonProps
}: ButtonProps) {
  const combinedClassName = [
    styles.button,
    variantClassNames[variant],
    sizeClassNames[size],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={combinedClassName} type={type} {...buttonProps}>
      {icon ? <span className={styles.icon} aria-hidden="true">{icon}</span> : null}
      <span className={styles.label}>{children}</span>
    </button>
  )
}

export default Button
