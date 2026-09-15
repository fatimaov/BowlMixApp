import type { HTMLAttributes } from 'react'

import styles from './PageTitle.module.css'

export type PageTitleProps = Omit<HTMLAttributes<HTMLHeadingElement>, 'children'> & {
  title?: string
}

/*
 * Future implementation: standardize page and screen titles across public and
 * private pages, including consistent hierarchy, spacing, and optional context.
 */
function PageTitle({ className, title: _title, ...headingProps }: PageTitleProps) {
  const classNames = [styles.placeholder, className].filter(Boolean).join(' ')

  return (
    <h1 className={classNames} {...headingProps}>
      PageTitle
    </h1>
  )
}

export default PageTitle
