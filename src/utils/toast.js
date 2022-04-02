let wrapper = null
const defaultOptions = { ms: 2000, disableClose: false, type: 'info' }

export function toast(msg, options = defaultOptions) {
  if (wrapper === null) {
    wrapper = document.createElement('div')
    wrapper.className = 'toasts'
    document.body.appendChild(wrapper)
  }

  const innerDiv = document.createElement('div')
  innerDiv.className = 'toast'
  wrapper.appendChild(innerDiv)
  const msgDiv = document.createElement('div')
  msgDiv.className = 'msg'
  msgDiv.innerText = msg
  innerDiv.appendChild(msgDiv)
  const xDiv = document.createElement('div')
  xDiv.className = 'x-button'
  xDiv.innerHTML = '✕'
  innerDiv.appendChild(xDiv)

  const autoCloseTimeout = setTimeout(() => {
    removeToast()
  }, options.ms)

  function closeToastHandler() {
    removeToast()
    clearTimeout(autoCloseTimeout)
  }

  function removeToast() {
    xDiv.removeEventListener('click', closeToastHandler)
    if (wrapper.contains(innerDiv)) {
      wrapper.removeChild(innerDiv)
    }
    if (wrapper.childNodes.length === 0) {
      wrapper.parentNode.removeChild(wrapper)
      wrapper = null
    }
  }

  xDiv.addEventListener('click', closeToastHandler)

  if (options.disableClose) {
    xDiv.style.display = 'none'
  }
}
