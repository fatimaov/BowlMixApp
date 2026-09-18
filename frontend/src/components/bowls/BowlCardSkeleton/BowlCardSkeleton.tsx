import type { HTMLAttributes } from 'react'

import './BowlCardSkeleton.module.css'

export type BowlCardSkeletonProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'>

/*
 * Future implementation: render a loading skeleton that visually mimics the
 * generated BowlCard while bowls are being generated in Public Demo, Build
 * Mode, and Generate Mode. It should include placeholder areas for the bowl
 * title, fingerprint, and ingredient chips/list, potentially using Bootstrap
 * placeholder and placeholder-glow classes with custom CSS Module animation.
 * This is distinct from LoadingState, which is generic; BowlCardSkeleton is
 * specific to bowl-generation loading UI. In Generate Mode, the parent can
 * render multiple instances instead of this component managing its own count.
 */
function BowlCardSkeleton({ ...skeletonProps }: BowlCardSkeletonProps) {
  return <div {...skeletonProps}>BowlCardSkeleton</div>
}

export default BowlCardSkeleton
