function RoutePageTemplate({ eyebrow, title, description, bullets }) {
  return (
    <div className="route-page">
      <p className="route-page__eyebrow">{eyebrow}</p>
      <h2 className="route-page__title display-6">{title}</h2>
      <p className="route-page__copy lead text-body-secondary">{description}</p>
      <ul className="route-page__list mt-4 text-body-secondary">
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </div>
  )
}

export default RoutePageTemplate
