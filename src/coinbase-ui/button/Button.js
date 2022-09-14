import styles from './Button.module.scss'

const extractButtonProps = ({ children, className, ...rest }) => ({ children, className, rest })

function Button(props) {
  const { children, className, rest } = extractButtonProps(props)

  const classNames = [styles.button, className]

  if (props.type === 'secondary') {
    classNames.push(styles.secondary)
  }
  if (props.fullWidth) {
    classNames.push(styles.fullWidth)
  }
  if (props.light) {
    classNames.push(styles.light)
  }
  if (props.big) {
    classNames.push(styles.big)
  }
  if (props.noBorder) {
    classNames.push(styles.noBorder)
  }

  return (
    <button className={classNames.join(' ')} {...rest}>
      {children}
    </button>
  )
}

export default Button
