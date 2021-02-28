import React, { useState, useEffect } from 'react';
import './Dashboard.css'
import Chart from '../../Components/Chart/Chart'
import MarketPairs from '../../Components/MarketPair/Marketpair'
import ArticleData from '../../Components/ArticleData/ArticleData';
import CurrentPrice from '../../Components/CurrentPrice/CurrentPrice';
import openSocket from 'socket.io-client';
import path from 'path'
import { baseUrl } from '../../axios'
import * as dotenv from "dotenv";

const envPath = path.join(__dirname, '../../../../.env');
dotenv.config({ path: envPath });

const socket = openSocket(`${baseUrl}:${process.env.PORT || 5000}`);

const Dashboard = (props) => {
  const [ tweets, setTweets ] = useState([])
  const [ currentBtn, setCurrentBtn ] = useState('')

  useEffect(() => {
    socket.on('latest tweets', mapTweetsToState)
  }, [])

  const stopStreaming = () => {
    setCurrentBtn('stop');
    socket.emit('stop stream', () => { });
  }

  const startStreaming = () => {
    setCurrentBtn('start')
    socket.emit('start stream', () => { });
  }

  const mapTweetsToState = (tweet) => {
    setTweets(prevTweets => prevTweets.concat(tweet));
  }
    return (
      <div className="row">
        <h1>{props.navbarTitle}</h1>

        <CurrentPrice 
          ticker={props.ticker} 
          tickerSource={props.tickerSource} 
          navbarTitle={props.navbarTitle} 
          assetType={props.assetType}
        />
        <div className="left">
          <Chart symbol={props.ticker} tickerSource={props.tickerSource}/>
          <MarketPairs symbol={props.symbol}/>
        </div>
        <div className="right">
          <ArticleData
            newsType={props.newsType}
            language={props.language}
            country={props.country}
            q={props.q}
            category={props.category}
          />
        </div>

        <div className='MainContainer'>
        <button className={(currentBtn === 'start') ? 'ActionBtn ActionBtn--Active' : 'ActionBtn'} onClick={startStreaming}>Start Stream</button>
        <button className={(currentBtn === 'stop') ? 'ActionBtn ActionBtn--Active' : 'ActionBtn'} onClick={stopStreaming}>Stop Stream</button>

        <div className='TweetContainer'>
          {tweets.map((tweet) => {
            return (
              <div className='TweetItem'>
                <p className='TweetItem__User'>{tweet.user}</p>
                <p className='TweetItem__Text'>{tweet.text}</p>
              </div>
            )
          })}
        </div>
      </div>

      </div>
    );
}

export default Dashboard;