import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ai'
export type ButtonSize = 'L' | 'M' | 'S'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  icon?: ReactNode
  size?: ButtonSize
  variant?: ButtonVariant
}

/*
 * Future implementation notes:
 * - Support the primary, secondary, tertiary, and AI visual variants.
 * - Support L, M, and S button sizes.
 * - Render the optional icon alongside the button label.
 * - Forward native button attributes and event handlers.
 * - Apply the scoped CSS Module classes for each variant and size.
 */
function Button(_props: ButtonProps) {
  return <button type="button">Button</button>
}

export default Button
