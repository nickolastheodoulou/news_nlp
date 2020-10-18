import React, { useState, useEffect } from "react";
import moment from "moment";
import {BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page A', uv: 200, pv: 2400, amt: 2400}, {name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

  

//javascript create JSON object from two dimensional Array
function arrayToJSONObject (arr){
  var keys = ["openTime", "open", "high", "low", "close", "volume", "closeTime", "Quote asset volume", "Number of trades", "Taker buy base asset volume", "Taker buy quote asset volume", "Ignore"]
  var formatted = [];
  for (var i=0; i<arr.length; i++) {
          var d = arr[i],
          object = {};
          object[keys[0]] = moment(d[0]).format("YYYY-MM-DD");
          object[keys[1]] = parseFloat(d[1])
          object[keys[2]] = parseFloat(d[2])
          object[keys[3]] = parseFloat(d[3])
          object[keys[4]] = parseFloat(d[4])
          object[keys[5]] = parseFloat(d[5])
          object[keys[6]] = moment(d[6]).format("YYYY-MM-DD");
          object[keys[7]] = parseFloat(d[7])
          object[keys[8]] = parseFloat(d[8])
          object[keys[9]] = parseFloat(d[9])
          formatted.push(object);
  }
  return formatted;
}

function Test () {
  const [binanceData, setBinanceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(binanceData)

  useEffect(() => {
    fetch(`https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1d`)
    .then(res => res.json())
    .then(response => {
      arrayToJSONObject(response)
      setBinanceData(arrayToJSONObject(response));
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
          <LineChart width={900} height={500} data={binanceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="high" stroke="#8884d8" />
            <Line type="monotone" dataKey="low" stroke="#82ca9d" />
            <Line type="monotone" dataKey="open" stroke="#10aaaf" />
            <Line type="monotone" dataKey="close" stroke="#f8a032" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="closeTime" />
            <YAxis />
            <Tooltip />
          </LineChart>

          <BarChart width={900} height={500} data={binanceData} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="closeTime"/>
            <YAxis/>
            <Tooltip/>
            <Legend />
            <Bar dataKey="high" stackId="a" fill="#8884d8" />
            <Bar dataKey="low" stackId="a" fill="#82ca9d" />
            <Bar dataKey="open" stackId="a" fill="#10aaaf" />
            <Bar dataKey="close" stackId="a" fill="#f8a032" />
          </BarChart>

          {JSON.stringify(binanceData,2,false)}
        </div>
      </div>
    )
}

export default Test;