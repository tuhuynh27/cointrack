import { render, unmountComponentAtNode } from 'react-dom'

import PriceTable from './PriceTable'

const columnData = [
  {
    name: 'Price',
    render: (coin) => `USD ${coin.price}`,
    isPrimary: true,
  },
]

const data = [
  {
    name: 'Bitcoin',
    code: 'BTC',
    logo: 'https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png',
    price: 0,
  },
  {
    name: 'Ethereum',
    code: 'ETH',
    logo: 'https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png',
    price: 1,
  },
]

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

it('should render a PriceTable', () => {
  render(<PriceTable columnData={columnData} data={data}/>, container)
})

it('should render a PriceTable with 3 rows', () => {
  render(<PriceTable columnData={columnData} data={data}/>, container)
  expect(container.querySelectorAll('tr').length).toBe(3)
})

it('should render a PriceTable with 4 columns', () => {
  render(<PriceTable columnData={columnData} data={data}/>, container)
  expect(container.querySelectorAll('th').length).toBe(3)
})

it('should render a PriceTable with the correct data', () => {
  render(<PriceTable columnData={columnData} data={data}/>, container)
  expect(container.querySelectorAll('td')[0].textContent).toBe('1')
  expect(container.querySelectorAll('td')[1].textContent).toBe('BitcoinBTC')
  expect(container.querySelectorAll('td')[2].textContent).toBe('USD 0USD 0')
})
