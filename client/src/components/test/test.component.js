import React, { useState, useEffect } from "react";

function Test () {
  const [commitHistory, setCommitHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    fetch(`https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1m`)
    .then(res => res.json())
    .then(response => {
      console.log(response)
      setCommitHistory(response);
      setIsLoading(false);
    })
    .catch(error => console.log(error))
  }, [])


    return (
      <div>
        <br></br>
        <br></br>
        <br></br>
        <h3> </h3>
        <div>
          <h1> Test </h1>
          {isLoading && <p>Loading...</p>}
          {commitHistory}
        </div>


      </div>
    )
}

export default Test;