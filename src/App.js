import { Suspense, lazy, useEffect, useLayoutEffect } from 'react'
import styles from './App.module.scss'

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from 'react-router-dom'

import RequireAuth from './components/auth/RequireAuth'

import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Navbar from './components/navbar/Navbar'
import LoadingFullPage from './components/loading-full-page/LoadingFullPage'
import ErrorBoundary from './components/error-boundary/ErrorBoundary'

const LandingPage = lazy(() => import('./modules/landing-page/LandingPage'))
const Portfolio = lazy(() => import('./modules/portfolio/Portfolio'))
const LoginPage = lazy(() => import('./modules/login-page/LoginPage'))
const NotFoundPage = lazy(() => import('./modules/not-found-page/NotFoundPage'))
const MarketUpdatesPage = lazy(() => import('./modules/market-updates-page/MarketUpdatesPage'))
const Upgrade = lazy(() => import('./modules/upgrade/Upgrade'))

const routes = [
  {
    path: '/',
    title: 'Home',
    exact: true,
    element: <LandingPage/>
  },
  {
    path: '/login',
    title: 'Login',
    element: <LoginPage/>
  },
  {
    path: '/portfolio',
    title: 'Portfolio',
    element: (
      <RequireAuth>
        <Portfolio />
      </RequireAuth>
    )
  },
  {
    path: '/portfolio/:code',
    title: 'Portfolio',
    element: (
      <RequireAuth>
        <NotFoundPage/>
      </RequireAuth>
    )
  },
  {
    path: '/transactions',
    title: 'Transactions',
    element: (
      <RequireAuth>
        <h2 style={{ margin: '50px 0 0 0' }}>Transactions</h2>
        <p>There's no transaction for now.</p>
      </RequireAuth>
    )
  },
  {
    path: '/pnl',
    title: 'PNL',
    element: (
      <RequireAuth>
        <h2 style={{ margin: '50px 0 0 0' }}>Profits and Losses</h2>
        <p>Please upgrade to Cointrack+ to use this feature.</p>
      </RequireAuth>
    )
  },
  {
    path: '/bot-trading',
    title: 'Bot Trading',
    element: (
      <RequireAuth>
        <h2 style={{ margin: '50px 0 0 0' }}>Bot Trading</h2>
        <p>Please upgrade to Cointrack+ to use this feature.</p>
      </RequireAuth>
    )
  },
  {
    path: '/market-updates',
    title: 'Market Updates',
    element: <MarketUpdatesPage/>
  },
  {
    path: '/upgrade',
    title: 'Upgrade',
    element: <Upgrade/>
  },
  {
    path: '*',
    element: <NotFoundPage/>
  }
]

function Router() {
  const location = useLocation()

  useEffect(() => {
    const route = routes.find(route => route.path === location.pathname)
    const title = route ? route.title : 'Not Found'
    document.title = title + ' - Cointrack'
  }, [location.pathname])

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <TransitionGroup>
      <CSSTransition key={location.pathname} exit={false} classNames="fade" timeout={300}>
        <div className={styles.outlet}>
          <ErrorBoundary>
            <Suspense fallback={<LoadingFullPage/>}>
              <Routes>
                {routes.map(route => (
                  <Route key={route.path} {...route} />
                ))}
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </div>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Navbar/>
        <Router/>
      </div>
    </BrowserRouter>
  )
}
