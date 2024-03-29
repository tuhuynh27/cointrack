import React from 'react'
import styles from './LandingPage.module.scss'

import Heading from './heading/Heading'
import IndexTable from './index-table/IndexTable'
import PortfolioShow from './portfolio-show/PortfolioShow'
import Footer from './footer/Footer'
import RenderIf from 'coinbase-ui/condition/RenderIf'

import { useSelector } from 'react-redux'
import { selectProfile } from 'modules/profile/profileSlice'
import { Link } from 'react-router-dom'

function greeting() {
  const today = new Date()
  const curHr = today.getHours()

  if (curHr < 12) {
    return 'Good Morning'
  } else if (curHr < 18) {
    return 'Good Afternoon'
  } else {
    return 'Good Evening'
  }
}

function LandingPage() {
  const profile = useSelector(selectProfile)

  return (
    <React.Fragment>
      <RenderIf value={profile.isLoggedIn}>
        <div className={styles.greeting}>
          <h1>{greeting()}, {profile.name}</h1>
          <p>Your profit is
            <span style={{ color: 'green', fontWeight: '500' }}> up 1.02% </span>
            today, checkout the crypto news <Link to="/market-updates">here</Link>.</p>
        </div>
        <IndexTable showMarketStatus={false}/>
      </RenderIf>
      <RenderIf value={!profile.isLoggedIn}>
        <Heading/>
        <IndexTable showMarketStatus={true}/>
        <PortfolioShow/>
        <Footer/>
      </RenderIf>
    </React.Fragment>
  )
}

export default LandingPage
