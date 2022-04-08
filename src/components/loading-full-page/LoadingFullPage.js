import styles from './LoadingFullPage.module.scss'

import Logo from 'assets/img/logo.png'

function LoadingFullPage() {
  return (
    <div className={styles.loadingFullPage}>
      <img src={Logo} alt="Loading" />
    </div>
  )
}

export default LoadingFullPage
