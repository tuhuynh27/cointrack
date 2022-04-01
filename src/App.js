import styles from './App.module.scss'

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import Navbar from './components/navbar/Navbar'
import LandingPage from './modules/landing-page/LandingPage'
import NotFound from './modules/not-found/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Navbar/>
        <div className={styles.outlet}>
          <Routes>
            <Route exact path="/" element={<LandingPage/>}/>
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
