import RoutePageTemplate from './RoutePageTemplate.jsx'

function SignupPage() {
  return (
    <RoutePageTemplate
      eyebrow="Public route"
      title="Sign up"
      description="This screen is reserved for account creation and onboarding."
      bullets={[
        'Capture username, email, and password.',
        'Surface validation feedback from the API clearly.',
        'Transition new users into the protected app experience.',
      ]}
    />
  )
}

export default SignupPage
