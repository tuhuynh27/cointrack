import React from 'react'

import Heading from './heading/Heading'
import IndexTable from './index-table/IndexTable'
import PortfolioShow from './portfolio-show/PortfolioShow'
import Footer from './footer/Footer'

function LandingPage() {
  return (
    <React.Fragment>
      <Heading/>
      <IndexTable/>
      <PortfolioShow/>
      <Footer/>
    </React.Fragment>
  )
}

export default LandingPage
