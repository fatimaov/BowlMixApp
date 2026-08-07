import RoutePageTemplate from './RoutePageTemplate.jsx'

function DashboardPage() {
  return (
    <RoutePageTemplate
      eyebrow="Protected route"
      title="Generator dashboard"
      description="This route will host the main authenticated creation experience."
      bullets={[
        'Support Build Mode and Generate Mode entry points.',
        'Show loading, empty, and error states for generation flows.',
        'Keep generated results and temporary UI state local where possible.',
      ]}
    />
  )
}

export default DashboardPage
