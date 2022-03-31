import './App.scss'

import LandingPage from './modules/landing-page/LandingPage'
import Navbar from './components/navbar/Navbar'

export default function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className="outlet">
        <LandingPage/>
      </div>
    </div>
  )
}
