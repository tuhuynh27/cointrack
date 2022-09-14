import styles from './Content.module.scss'

function Content({ children }) {
  return (
    <div className={styles.outlet}>
      {children}
    </div>
  )
}

export default Content
