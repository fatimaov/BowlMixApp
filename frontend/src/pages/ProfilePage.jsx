import RoutePageTemplate from './RoutePageTemplate.jsx'

function ProfilePage() {
  return (
    <RoutePageTemplate
      eyebrow="Protected route"
      title="Profile"
      description="This route is reserved for current-user account management."
      bullets={[
        'Load the authenticated user profile from `/api/auth/me`.',
        'Support profile edits and account deactivation flows.',
        'Centralize session handling around JWT-backed auth state.',
      ]}
    />
  )
}

export default ProfilePage
