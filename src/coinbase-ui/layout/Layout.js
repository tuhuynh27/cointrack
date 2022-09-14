import styles from './Layout.scss'
import ThemeContext from 'coinbase-ui/context/ThemeContext'

function Layout({ children, theme = {
  logo: null,
} }) {
  return (
    <ThemeContext.Provider className={styles.app} value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}

export default Layout
