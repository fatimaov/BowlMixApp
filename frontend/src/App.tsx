import { NavLink, Outlet } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <main className="app">
      <header className="border-bottom bg-white">
        <div className="container py-3">
          <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3">
            <div>
              <p className="app__eyebrow mb-1">BowlMix</p>
              <h1 className="app__brand mb-0">Frontend</h1>
            </div>
            <nav aria-label="Primary" className="app__nav nav nav-pills flex-wrap gap-2">
              <NavLink to="/" end className={({ isActive }) => appNavLinkClassName(isActive)}>
                Landing
              </NavLink>
              <NavLink to="/demo" className={({ isActive }) => appNavLinkClassName(isActive)}>
                Public Demo
              </NavLink>
              <NavLink to="/login" className={({ isActive }) => appNavLinkClassName(isActive)}>
                Login
              </NavLink>
              <NavLink to="/signup" className={({ isActive }) => appNavLinkClassName(isActive)}>
                Sign Up
              </NavLink>
              <NavLink
                to="/app/generator-dashboard"
                className={({ isActive }) => appNavLinkClassName(isActive)}
              >
                Generator
              </NavLink>
              <NavLink
                to="/app/my-ingredients"
                className={({ isActive }) => appNavLinkClassName(isActive)}
              >
                My Ingredients
              </NavLink>
              <NavLink
                to="/app/saved-bowls"
                className={({ isActive }) => appNavLinkClassName(isActive)}
              >
                Saved Bowls
              </NavLink>
              <NavLink
                to="/app/profile"
                className={({ isActive }) => appNavLinkClassName(isActive)}
              >
                Profile
              </NavLink>
            </nav>
          </div>
        </div>
      </header>

      <div className="container py-4 py-md-5">
        <section className="app__shell card border-0 shadow-sm">
          <div className="card-body p-4 p-md-5">
            <Outlet />
          </div>
        </section>
      </div>
    </main>
  )
}

function appNavLinkClassName(isActive: boolean) {
  return `nav-link ${isActive ? 'active' : 'text-body-secondary'}`
}

export default App
