import type { HTMLAttributes } from 'react'

export type LogoVariant = 'vertical' | 'horizontal'
export type LogoSize = 'hero' | 'compact'

export type LogoProps = Omit<HTMLAttributes<HTMLSpanElement>, 'children'> & {
  alt?: string
  size?: LogoSize
  variant?: LogoVariant
}

/*
 * Future implementation notes:
 * - Render the vertical BowlMix logo asset for landing and hero areas.
 * - Render the horizontal BowlMix logo asset for app and header areas.
 * - Support hero and compact size presets.
 * - Preserve accessible alt text and wrapper HTML attributes.
 * - Apply the scoped CSS Module classes for the selected variant and size.
 */
function Logo(_props: LogoProps) {
  return <span>Logo</span>
}

export default Logo
