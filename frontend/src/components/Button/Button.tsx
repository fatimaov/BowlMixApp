import {
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react'
import {Link, type LinkProps} from 'react-router-dom'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ai'
export type ButtonSize = 'L' | 'M' | 'S'

type ButtonBaseProps = {
  children: ReactNode
  icon?: ReactNode
  size?: ButtonSize
  variant?: ButtonVariant
}

type ButtonModeProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  as?: 'button'
  type?: 'button' | 'submit'
}

type LinkModeProps = Omit<LinkProps, 'type'> & {
  as: 'link'
}

export type ButtonProps = ButtonBaseProps & (ButtonModeProps | LinkModeProps)

/*
 * Future implementation notes:
 * - Support the primary, secondary, tertiary, and AI visual variants.
 * - Support L, M, and S button sizes.
 * - Render the optional icon alongside the button label.
 * - Render as either a native button or a React Router Link via the `as` prop.
 * - Support `to` for React Router links and `type` (`button` or `submit`) for native buttons.
 * - Forward the corresponding native button or React Router Link props and event handlers.
 * - Apply the scoped CSS Module classes for each variant and size.
 */
function Button({children, icon, size, variant, as = 'button', ...props}: ButtonProps) {
  if (as === 'link') {
    return <Link {...(props as LinkProps)}>{children}</Link>
  }

  const {type = 'button', ...buttonProps} = props as ButtonModeProps

  return <button type={type} {...buttonProps}>{children}</button>
}

export default Button
