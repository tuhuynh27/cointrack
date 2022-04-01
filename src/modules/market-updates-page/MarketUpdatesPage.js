import styles from './MarketUpdatesPage.module.scss'

import { news } from './data'

import { Link } from 'react-router-dom'

function MarketUpdatesPage() {
  return (
    <div className={styles.marketUpdatesPage}>
      <div className={styles.headlines}>
        <h1>Market updates</h1>
        <p>Understand the news and events behind the latest market moves</p>
      </div>
      <div className={styles.articles}>
        {news.map((article, index) => (
          <div className={styles.article} key={article.title}>
            <img src={article.image} alt={article.title} />
            <Link to={`/market-updates/${index + 1}`}><h2>{article.title}</h2></Link>
            <p>{article.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MarketUpdatesPage
