import './Heading.scss'

import MobileAppIconSvg from 'components/svg/MobileAppIconSvg'

function Heading() {
  return (
    <div className="heading">
      <div className="left-side">
        <h1>Jump start your crypto portfolio</h1>
        <h2>
          Cointrack is the easiest place to keep track of your cryptocurrency. Sign
          up and get started today.
        </h2>
        <div className="get-start">
          <input placeholder="Email address" />
          <button>Get started</button>
        </div>
      </div>
      <div className="right-side">
        <MobileAppIconSvg />
      </div>
    </div>
  )
}

export default Heading
