import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import './Marketpair.css';
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import BTC from 'cryptocurrency-icons/32/color/btc.png'
import ETH from 'cryptocurrency-icons/32/color/eth.png'
import USDT from 'cryptocurrency-icons/32/color/usdt.png'


const MarketPairs = (props) => {
    const [products, setProducts] = useState(null);

    const connectSocketStreams = (streams) => {
        streams = streams.join('/');
        let connection = btoa(streams);
        connection = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);
        connection.onmessage = evt => { 
            var wsData = JSON.parse(evt.data).data.map(datapoint => ({ 
                eventType: datapoint.e, 
                eventTime: new Date(Number(datapoint.E)).toLocaleString(), 
                symbol: datapoint.s,
                priceChange: datapoint.p,
                priceChangePercent: datapoint.P,
                weightedAveragePrice: datapoint.w,
                firstTradeF_minus_1_price: datapoint.x,
                lastPrice: datapoint.c,
                lastQuantity: datapoint.Q,
                bestBidPrice: datapoint.b,  
                bestBidQuantity: datapoint.B,
                bestAskPrice: datapoint.a,
                bestAskQuantity: datapoint.A,
                openPrice: datapoint.o,
                highPrice: datapoint.h,
                lowPrice: datapoint.l,
                totalTradedBaseAssetVolume: datapoint.v,
                totalTradedQuoteAssetVolumne: datapoint.q,
                statisticsOpenTime: datapoint.O,
                statisticsCloseTime: datapoint.C,
                firstTradeId: datapoint.F,
                lastTradeId: datapoint.L,
                totalNumberOfTrades: datapoint.n
            }));
        
            wsData = wsData.filter(datapoint => (
                datapoint.symbol.startsWith(props.symbol)
            ))
            setProducts(wsData)
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

    const countryBodyTemplate = (products) => (
            <div style={{display: 'table'}}>
                <img style={{width:'32px', height:'32px', verticalAlign: 'bottom'}} src={BTC} alt="not working" />
                <i style={{verticalAlign:'super', marginRight: '.25em', marginLeft: '.25em'}} className="pi pi-arrow-right"></i>
                <img style={{width:'32px', height:'32px', verticalAlign: 'bottom'}} src={USDT} alt="not working" />
                <span style={{verticalAlign: 'super', marginLeft: '.5em'}}>{products.symbol}</span>
            </div>
        )

        return (
            <div className='datatable-templating-demo'>
                <div className="card">
                    <DataTable value={products} className="p-datatable-striped" scrollable scrollHeight="500px">
                        <Column style={{ width:"230px" }} field="symbol"header="Symbol" body={countryBodyTemplate}></Column>
                        <Column field="eventTime" header="Ticker time"></Column>
                        <Column field="lastPrice" header="Last price"></Column>
                        <Column field="lastQuantity" header="Last quantity"></Column>
                        <Column field="openPrice" header="Open Price"></Column>
                        <Column field="highPrice" header="High Price"></Column>
                        <Column field="lowPrice" header="Last Low Price"></Column>
                    </DataTable>
                </div>
            </div>
        )
    }

export default MarketPairs;