import React, {useEffect, useState } from 'react';

const CurrentPrice = (props) => {
  const [price, setPrice] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

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
  }, [props.assetType, props.ticker, price])

  return(
    <div>
      {props.tickerSource !== "" &&
        <>
          <h1 align='center'>The current price of {props.navbarTitle} is ${price}</h1>
          <h4 align='center'>Source: {props.tickerSource}</h4>
        </>
        }
    </div>
  )
}

export default CurrentPrice;