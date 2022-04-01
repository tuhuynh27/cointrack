import React from 'react'

import Heading from './heading/Heading'
import IndexChart from './index-chart/IndexChart'
import PortfolioShow from './portfolio-show/PortfolioShow'
import Footer from './footer/Footer'

function LandingPage() {
  return (
    <React.Fragment>
      <Heading/>
      <IndexChart/>
      <PortfolioShow/>
      <Footer/>
    </React.Fragment>
  )
}

export default LandingPage
