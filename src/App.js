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

export default function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Navbar/>
        <div className={styles.outlet}>
          <Routes>
            <Route exact path="/" element={<LandingPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="*" element={<NotFoundPage/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
