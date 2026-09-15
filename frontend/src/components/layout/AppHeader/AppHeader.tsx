import type { ButtonHTMLAttributes } from 'react'

export type AppHeaderVariant = 'public' | 'private'

export type AppHeaderProps = {
  backButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>
  className?: string
  menuButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>
  variant?: AppHeaderVariant
}

/*
 * Future implementation notes:
 * - Render the shared horizontal compact Logo.
 * - In the public variant, render a back button/action area.
 * - In the private variant, render a burger/menu button placeholder.
 * - Add placeholder links for Dashboard, My Ingredients, Saved Bowls,
 *   Profile, and Logout before wiring navigation behavior.
 * - Forward button props and apply scoped layout styles.
 */
function AppHeader(_props: AppHeaderProps) {
  return <header>AppHeader</header>
}

export default AppHeader
