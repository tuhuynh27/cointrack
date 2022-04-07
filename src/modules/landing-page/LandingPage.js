import React from 'react'
import styles from './LandingPage.module.scss'

import Heading from './heading/Heading'
import IndexTable from './index-table/IndexTable'
import PortfolioShow from './portfolio-show/PortfolioShow'
import Footer from './footer/Footer'
import RenderIf from 'components/condition/RenderIf'

import { useSelector } from 'react-redux'
import { selectProfile } from 'modules/profile/profileSlice'

function LandingPage() {
  const profile = useSelector(selectProfile)

  return (
    <React.Fragment>
      <RenderIf value={!profile.isLoggedIn}>
        <Heading/>
      </RenderIf>
      <RenderIf value={profile.isLoggedIn}>
        <div className={styles.greeting}>
          <h1>Welcome back, {profile.email}</h1>
        </div>
      </RenderIf>
      <IndexTable/>
      <RenderIf value={!profile.isLoggedIn}>
        <PortfolioShow/>
      </RenderIf>
      <Footer/>
    </React.Fragment>
  )
}

export default LandingPage
