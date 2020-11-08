import React, { useState, useEffect } from 'react';
import './newsList.css'
import Chart from '../chart/chart'
import MarketPairs from '../marketpairs/Marketpairs'

function HomeNewsList(props) {

  
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [articles, setItems] = useState([]);
  const [price, setPrice] = useState([]);

  const [pageNumber, setPageNumber] = useState(1)





  useEffect(() => {
    if (props.assetType === 'crypocurrency'){
      fetch(`https://api.binance.com/api/v1/ticker/price?symbol=${props.ticker}`,{
        dataType: 'jsonp'}
      ).then(res => res.json())
        .then(
          (res) => {
            res.price = parseFloat(res.price).toFixed(2);

            setPrice(res.price);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }
    else if(props.assetType === 'stock'){
      fetch(`https://finnhub.io/api/v1/quote?symbol=AAPL&token=bt4lo7f48v6um6kgon20`,{
        dataType: 'jsonp'}
      ).then(res => res.json())
        .then(
          (res) => {
            res.c = parseFloat(res.c).toFixed(2);

            setPrice(res.c);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }

  }, [props.assetType, props.ticker])

  function incrementPageNumber() {
    setPageNumber(prevPageNumber => prevPageNumber + 1)
    window.scrollTo(0, 0)

  }

  function decrementPageNumber() {
    setPageNumber(prevPageNumber => prevPageNumber - 1)
    window.scrollTo(0, 0)

  }


  // the [pageNumber] means useEffect will run only when the state pageNumber is updated
  useEffect(() => {
    fetch(`https://murmuring-castle-67752.herokuapp.com/getnews?newsType=${props.newsType}&language=${props.language}&country=${props.country}&q=${props.q}&category=${props.category}&pageNumber=${pageNumber}`, {
        dataType: 'jsonp'}
        )
      .then(res => res.json())
      .then(
        (res) => {
          setIsLoaded(true);
          setItems(res.articles);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [pageNumber])


  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (

      <div className="body">
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        {props.tickerSource !== "" &&
        <>
          <h1 align='center'>The current price of {props.navbarTitle} is ${price}</h1>
          <h4 align='center'>Source: {props.tickerSource}</h4>
        </>
        }
  
        <h1>{props.navbarTitle}</h1>


        {props.tickerSource === "Binance" &&
        <>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Chart symbol={props.ticker}/>
        </div>
        </>
        }

        {props.symbol !== "" &&
          <MarketPairs symbol={props.symbol}/>
        }

        <ul className="divlist">
          {articles.map(item => (
            <div className="article">
              <h3>{item.title}</h3>
              Source: <a href={item.url}>{item.source.name}</a>
              <br></br>
              Author: {item.author}
              <br></br>
              <a href={item.url}>
                <img src={item.urlToImage} alt="Logo" />
              </a>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </div>
          ))}
          <br></br>
        </ul>

        <div className="pageChange">
          <button onClick={decrementPageNumber}>Previous page</button>
          <span>You are on page {pageNumber}</span>
          <button onClick={incrementPageNumber}>Next page</button>
        </div>
        <br></br>
        <br></br>
      </div>
    );
  }
}

export default HomeNewsList;