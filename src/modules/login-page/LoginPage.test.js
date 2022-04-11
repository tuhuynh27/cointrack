import { render, unmountComponentAtNode } from 'react-dom'
import { Provider } from 'react-redux'
import { store } from 'store/store'
import { BrowserRouter } from 'react-router-dom'

import LoginPage from './LoginPage'

let container = null
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

it('should render a LoginPage', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <LoginPage/>
      </Provider>
    </BrowserRouter>, container)
})

it('should render a LoginPage with a clickable login button', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <LoginPage/>
      </Provider>
    </BrowserRouter>, container)
  expect(container.querySelector(`button[data-test='login-button']`).disabled).toBeFalsy()
})

it('should render a LoginPage with a clickable Google login button', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <LoginPage/>
      </Provider>
    </BrowserRouter>, container)
  expect(container.querySelector(`button[data-test='google-login-button']`).disabled).toBeFalsy()
})

it('should render a LoginPage with email and password input', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <LoginPage/>
      </Provider>
    </BrowserRouter>, container)
  expect(container.querySelector('input[type="email"]')).toBeTruthy()
  expect(container.querySelector('input[type="password"]')).toBeTruthy()
})

it('should render error message when login without email', () => {
  render(
    <BrowserRouter>
      <Provider store={store}>
        <LoginPage/>
      </Provider>
    </BrowserRouter>, container)
  const emailInput = container.querySelector('input[type="email"]')
  emailInput.value = ''
  const loginButton = container.querySelector('button[data-test="login-button"]')
  loginButton.click()
  expect(container.querySelector(`p[data-test='email-error']`)).toBeTruthy()
  expect(container.querySelector('p').textContent).not.toBeNull()
})
