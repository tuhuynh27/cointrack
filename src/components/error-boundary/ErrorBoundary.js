import React from 'react'

class ErrorBoundary extends React.Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // Error logging
    console.log(error, info)
  }

  componentDidMount() {
    document.title = 'Error - Something went wrong - Cointrack'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>Please try again later.</p>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
