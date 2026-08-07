import RoutePageTemplate from './RoutePageTemplate.jsx'

function LandingPage() {
  return (
    <RoutePageTemplate
      eyebrow="Public route"
      title="Public demo landing"
      description="This route is ready for the BowlMix demo and marketing entry experience."
      bullets={[
        'Introduce Build Mode and Generate Mode.',
        'Move guests toward demo usage or account creation.',
        'Keep this route accessible without authentication.',
      ]}
    />
  )
}

export default LandingPage
