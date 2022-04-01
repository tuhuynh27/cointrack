import styles from './Footer.module.scss'

function Footer() {
  return (
    <div className={styles.footer}>
      <p>Copyright <a href="https://tuhuynh.com" target="_blank" rel="noreferrer">&copy; 2022 Tu Huynh</a></p>
      <p>UI used from <a href="https://coinbase.com" target="_blank" rel="noreferrer">Coinbase Inc &trade;</a></p>
    </div>
  )
}

export default Footer