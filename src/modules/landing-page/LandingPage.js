import React from 'react'

import Heading from './heading/Heading'
import IndexChart from './index-chart/IndexChart'
import PortfolioShow from './portfolio-show/PortfolioShow'

function LandingPage() {
  return (
    <React.Fragment>
      <Heading/>
      <IndexChart/>
      <PortfolioShow/>
    </React.Fragment>
  )
}

export default LandingPage
