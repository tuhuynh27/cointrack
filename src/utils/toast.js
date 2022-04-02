let toasts = 0

export function toast(msg, ms) {
  const wrapperDiv = document.createElement('div')
  wrapperDiv.className = 'toast'
  wrapperDiv.style.top = 75 + toasts * 55 + 'px'
  const innerDiv = document.createElement('div')
  innerDiv.className = 'msg'
  innerDiv.innerHTML = msg
  wrapperDiv.appendChild(innerDiv)
  const xDiv = document.createElement('div')
  xDiv.className = 'x'
  xDiv.innerHTML = '✕'
  innerDiv.appendChild(xDiv)
  document.body.appendChild(wrapperDiv)
  toasts++

  const timeout = setTimeout(() => {
    removeToast()
  }, ms)

  function handlerClose() {
    removeToast()
    clearTimeout(timeout)
  }

  function removeToast() {
    document.body.removeChild(wrapperDiv)
    toasts--
  }

  xDiv.addEventListener('click', handlerClose)
}
