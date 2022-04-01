import styles from './Heading.module.scss'

import MobileAppIconSvg from 'modules/svg/MobileAppIconSvg'

function Heading() {
  return (
    <div className={styles.heading}>
      <div className={styles.leftSide}>
        <h1>Jump start your crypto portfolio</h1>
        <h2>
          Cointrack is the easiest place to keep track of your cryptocurrency. Sign
          up and get started today.
        </h2>
        <div className={styles.getStarted}>
          <input placeholder="Email address" />
          <button>Get started</button>
        </div>
      </div>
      <div className={styles.rightSide}>
        <MobileAppIconSvg />
      </div>
    </div>
  )
}

export default Heading
