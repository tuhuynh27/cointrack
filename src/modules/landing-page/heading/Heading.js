import { useState } from 'react'
import styles from './Heading.module.scss'

import { useNavigate } from 'react-router-dom'

import mobileAppIconSvg from 'modules/svg/mobileAppIcon.svg'

function Heading() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    navigate(`login?email=${email}`)
  }

  return (
    <div className={styles.heading}>
      <div className={styles.leftSide}>
        <h1>Jump start your crypto portfolio</h1>
        <h2>
          Cointrack is the easiest place to keep track of your cryptocurrency. Sign
          up and get started today.
        </h2>
        <form className={styles.getStarted} onSubmit={handleSubmit}>
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" />
          <button type="submit">Get started</button>
        </form>
      </div>
      <div className={styles.rightSide}>
        <object type="image/svg+xml" className={styles.svg} data={mobileAppIconSvg}>
          Your browser does not support SVG
        </object>
      </div>
    </div>
  )
}

export default Heading
