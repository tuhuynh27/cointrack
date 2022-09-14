import React from 'react'
import styles from './PriceTable.module.scss'
import RenderIf from 'coinbase-ui/condition/RenderIf'

function getColumnClassName(col) {
  if (col.isPrimary) {
    return styles.primary
  }
  if (col.isSecondary) {
    return styles.secondary
  }
  return styles.default
}

function getColumnStyles(col) {
  if (col.isPrimary) {
    return { width: '15%' }
  }
  return { width: '10%' }
}

function DataCell({ columnData, column, coin }) {
  if (column.isPrimary) {
    return (
      <React.Fragment>
        <div className={styles.desktop}>
          <CellValue column={column} coin={coin}/>
        </div>

        <div className={styles.mobile}>
          {columnData.filter(col => col.isPrimary || col.isSecondary)
            .map(column => <CellValue key={column.name} column={column} coin={coin}/>)}
        </div>
      </React.Fragment>
    )
  }

  return <CellValue column={column} coin={coin}/>
}

function CellValue({ column, coin }) {
  return <React.Fragment>
    {column.render ? column.render(coin) : coin[column.selector]}
  </React.Fragment>
}

const defaultTableOptions = {
  displayIndex: true,
  showMarketStatus: true,
}

function PriceTable({ tableOptions = defaultTableOptions, columnData = [], data = [] }) {

  const marketStatus = tableOptions.showMarketStatus ?
    (data.reduce((sum, coin) => sum + parseFloat(coin.change), 0) / data.length) : 0

  return (
    <React.Fragment>
      <RenderIf value={tableOptions.showMarketStatus}>
        <div className={styles.marketInfo}>
          <p>In the past 24 hours</p>
          <h2>Market is&nbsp;
            {marketStatus >= 0 ? 'up' : 'down'} <span style={{ color: marketStatus >= 0 ? 'green' : 'red' }}>
            {Math.abs(marketStatus).toFixed(2)}%</span>
          </h2>
        </div>
      </RenderIf>
      <div className={styles.priceTable}>
        <table>
          <thead>
          <tr>
            {tableOptions.displayIndex && <th className={styles.index} style={{ width: '5%' }}>#</th>}
            <th>Name</th>
            {columnData.map((column, index) => (
              <th key={index}
                  className={getColumnClassName(column)}
                  style={getColumnStyles(column)}>
                {column.name}
              </th>
            ))}
          </tr>
          </thead>
          <tbody>
          {data.map((coin, index) => <tr key={coin.name}>
            {tableOptions.displayIndex && <td className={styles.index}>{index + 1}</td>}
            <td>
              <div className={styles.nameColumn}>
                <img className={styles.logo} alt={`${coin.name} logo`} src={coin.logo}/>
                <div className={styles.title}>
                  <div className={styles.coinName}>{coin.name}</div>
                  <div className={styles.coinCode}>{coin.code}</div>
                </div>
              </div>
            </td>
            {columnData.map((column, index) => (
              <td key={index}
                  className={getColumnClassName(column)}>
                <DataCell columnData={columnData} column={column} coin={coin}/>
              </td>
            ))}
          </tr>)}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}

export default React.memo(PriceTable)
