import RoutePageTemplate from './RoutePageTemplate.jsx'

function SavedBowlsPage() {
  return (
    <RoutePageTemplate
      eyebrow="Protected route"
      title="Saved bowls"
      description="This route is prepared for the authenticated saved-bowl list and detail flow."
      bullets={[
        'List saved bowls owned by the current user.',
        'Support updating names and removing saved items.',
        'Preserve snapshot-based display consistency across visits.',
      ]}
    />
  )
}

export default SavedBowlsPage
