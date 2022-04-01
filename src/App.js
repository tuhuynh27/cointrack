import styles from './App.module.scss'

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import Navbar from './components/navbar/Navbar'
import LandingPage from './modules/landing-page/LandingPage'
import LoginPage from './modules/login-page/LoginPage'
import NotFoundPage from './modules/not-found-page/NotFoundPage'
import RequireAuth from './components/auth/RequireAuth'
import MarketUpdatesPage from './modules/market-updates-page/MarketUpdatesPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Navbar/>
        <div className={styles.outlet}>
          <Routes>
            <Route exact path="/" element={<LandingPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/portfolio"
                   element={<RequireAuth>
                     <NotFoundPage/>
                   </RequireAuth>}/>
            <Route path="/transactions"
                   element={<RequireAuth>
                     <NotFoundPage/>
                   </RequireAuth>}/>
            <Route path="/pnl"
                   element={<NotFoundPage/>}/>
            <Route path="/bot-trading"
                   element={<NotFoundPage/>}/>
            <Route path="/market-updates"
                   element={<MarketUpdatesPage/>}/>
            <Route path="*" element={<NotFoundPage/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
