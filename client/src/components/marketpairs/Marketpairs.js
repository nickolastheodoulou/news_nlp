import React from 'react'

class MarketPairs extends React.Component {

    constructor(props) {
        super(props);
        this._handleTabClick = this._handleTabClick.bind(this);
    }

    _getTickerBySymbol(data) {
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

    _handleTabClick(e) {
        let market = e.currentTarget ? e.currentTarget.getAttribute('data-tab') : e;
        // this.props.dispatch({type: 'SET_ACTIVE_MARKET',data: {filtered_pairs: Object.keys(this.props.market_pairs).filter(item => item.endsWith(market)),market: market} })
    }

    _connectSocketStreams(streams) {
        streams = streams.join('/');
        let connection = btoa(streams);
        this[connection] = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);
        this[connection].onmessage = evt => { 
            let ticker = this._getTickerBySymbol(JSON.parse(evt.data).data)
            console.log(JSON.parse(evt.data))
            // this.props.dispatch({type: 'UPDATE_MARKET_PAIRS',data: ticker})
            // !this.props.active_market.market && this._handleTabClick('BTC')
        }
        this[connection].onerror = evt => {
            console.error(evt);
        }
    }

    _disconnectSocketStreams(streams){
        streams = streams.join('/');
        let connection = btoa(streams);
        if (this[connection].readyState === WebSocket.OPEN) {
            this[connection].close();
        }
    }

    componentDidMount() {
        this._connectSocketStreams(['!ticker@arr'])
    }

    componentWillUnmount() {
        this._disconnectSocketStreams(['!ticker@arr'])
    }

    render() {
        return (
            <React.Fragment>
                <h1>nnn</h1>
            </React.Fragment>    
      )
    }

}

export default MarketPairs;