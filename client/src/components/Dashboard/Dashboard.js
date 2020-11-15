import React from 'react';
import './Dashboard.css'
import Chart from '../Chart/Chart'
import MarketPairs from '../Marketpairs/Marketpairs'
import ArticleData from '../ArticleData/ArticleData';
import CurrentPrice from '../CurrentPrice/CurrentPrice';

const Dashboard = (props) => {
    return (
      <div className="body">
        <h1>{props.navbarTitle}</h1>

        <CurrentPrice 
          ticker={props.ticker} 
          tickerSource={props.tickerSource} 
          navbarTitle={props.navbarTitle} 
          assetType={props.assetType}
        />

        {props.tickerSource === "Binance" &&
        <div>
          <Chart symbol={props.ticker} tickerSource={props.tickerSource}/>
        </div>
        }

        {props.symbol !== "" &&
          <MarketPairs symbol={props.symbol}/>
        }

        <ArticleData
          newsType={props.newsType}
          language={props.language}
          country={props.country}
          q={props.q}
          category={props.category}
        />
        
      </div>
    );
}

export default Dashboard;