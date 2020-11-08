import React from 'react';
import './Dashboard.css'
import Chart from '../chart/chart'
import MarketPairs from '../marketpairs/Marketpairs'
import ArticleData from '../articleData/articleData';
import CurrentPrice from '../currentPrice/currentPrice';

const Dashboard = (props) => {
    return (
      <div className="body">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
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