import React from 'react';
import './Dashboard.css'
import Chart from '../../Components/Chart/Chart'
import MarketPairs from '../../Components/Marketpairs/Marketpairs'
import ArticleData from '../../Components/ArticleData/ArticleData';
import CurrentPrice from '../../Components/CurrentPrice/CurrentPrice';

const Dashboard = (props) => {
    return (
      <div class="row">
        <h1>{props.navbarTitle}</h1>

        <CurrentPrice 
          ticker={props.ticker} 
          tickerSource={props.tickerSource} 
          navbarTitle={props.navbarTitle} 
          assetType={props.assetType}
        />
        <div class="left">
          <Chart symbol={props.ticker} tickerSource={props.tickerSource}/>
          <MarketPairs symbol={props.symbol}/>
        </div>
        <div class="right">
          <ArticleData
            newsType={props.newsType}
            language={props.language}
            country={props.country}
            q={props.q}
            category={props.category}
          />
        </div>
      </div>
    );
}

export default Dashboard;