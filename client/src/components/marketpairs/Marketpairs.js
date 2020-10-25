import React, {useEffect, useState} from 'react'

export default function MarketPairs() {
    const [ethPrice, setEthPrice] = useState("")

    function getTickerBySymbol(data) {
        let ticker = {}
        data.forEach(item => {
            let symbol = item.symbol || item.s;
            ticker[symbol] = {
                symbol: symbol,
                lastPrice: item.lastPrice || item.c,
                priceChange: item.priceChange || item.p,
                priceChangePercent: item.priceChangePercent || item.P,
                highPrice: item.highPrice || item.h,
                lowPrice: item.lowPrice || item.l,
                quoteVolume: item.quoteVolume || item.q,
            }
        }) 
        return ticker;
    }


    function connectSocketStreams(streams) {
        streams = streams.join('/');
        let connection = btoa(streams);
        console.log(connection)
        connection = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);
        connection.onmessage = evt => { 
            let ticker = getTickerBySymbol(JSON.parse(evt.data).data)
            const ethPrice = parseFloat(ticker.ETHUSDT.lastPrice).toFixed(2);
            console.log(ethPrice)
            setEthPrice(ethPrice)
            // this.props.dispatch({type: 'UPDATE_MARKET_PAIRS',data: ticker})
            // !this.props.active_market.market && this._handleTabClick('BTC')
        }
        connection.onerror = evt => {
            console.error(evt);
        }
    }

    function disconnectSocketStreams(streams){
        streams = streams.join('/');
        let connection = btoa(streams);
        if (connection.readyState === WebSocket.OPEN) {
            connection.close();
        }
    }

    useEffect(() => {
        connectSocketStreams(['!ticker@arr'])
        return (disconnectSocketStreams(['!ticker@arr']))
    },[])


    return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <h1>Hello</h1>
            <h1>${ethPrice}</h1>
        </div>
    )
}

