import RoutePageTemplate from './RoutePageTemplate.jsx'

function IngredientsPage() {
  return (
    <RoutePageTemplate
      eyebrow="Protected route"
      title="My ingredients"
      description="This route is ready for personalized ingredient availability management."
      bullets={[
        'Fetch the current user ingredient set from the API.',
        'Let users toggle availability and manage ingredient state.',
        'Keep category and filtering behavior aligned with backend rules.',
      ]}
    />
  )
}

export default IngredientsPage
