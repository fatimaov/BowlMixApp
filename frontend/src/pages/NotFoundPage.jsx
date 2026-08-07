import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="route-page">
      <p className="route-page__eyebrow">Missing route</p>
      <h2 className="route-page__title display-6">Page not found</h2>
      <p className="route-page__copy lead text-body-secondary">
        The page you requested does not exist in the current frontend route map.
      </p>
      <Link to="/" className="btn btn-primary mt-4">
        Back to demo
      </Link>
    </div>
  )
}

export default NotFoundPage
