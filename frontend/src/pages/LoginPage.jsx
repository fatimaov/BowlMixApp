import RoutePageTemplate from './RoutePageTemplate.jsx'

function LoginPage() {
  return (
    <RoutePageTemplate
      eyebrow="Public route"
      title="Login"
      description="This screen is ready for the authenticated sign-in flow."
      bullets={[
        'Collect credentials with controlled React forms.',
        'Send auth requests through centralized fetch services.',
        'Redirect authenticated users into the dashboard flow.',
      ]}
    />
  )
}

export default LoginPage
