import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';

import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const MarketPairs = (props) => {
    const [products, setProducts] = useState(null);
        
    function connectSocketStreams(streams) {
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

            // console.log(wsData[0].symbol.filter(item => item.endsWith("BTC")))
            //.filter(item => item.endsWith("BTC"))
            //console.log(JSON.stringify(wsData))

            wsData = wsData.filter(datapoint => datapoint.symbol.endsWith(props.symbol));
            console.log(wsData)
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

    function countryBodyTemplate(products){
        let symbol = products.symbol;

        return (
            <React.Fragment>
                <span style={{verticalAlign: 'middle', marginLeft: '.5em'}}>{symbol}</span>
                {/* 
                <img src="showcase/demo/images/flag_placeholder.png" 
                onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt="notworking" />
                */}
            </React.Fragment>
        );
    }
    

        return (
            <div>
                <div className="card">
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <DataTable value={products} className="p-datatable-striped" rows={10}>
                        <Column field="symbol" header="Symbol" body={countryBodyTemplate}></Column>
                        <Column field="eventTime" header="Ticker time"></Column>
                        <Column field="lastPrice" header="Last price"></Column>
                        <Column field="lastQuantity" header="Last quantity"></Column>

                        <Column field="openPrice" header="Open Price"></Column>
                        <Column field="highPrice" header="High Price"></Column>
                        <Column field="lowPrice" header="Last Low Price"></Column>


                        <Column field="bestBidPrice" header="Best bid price"></Column>
                        <Column field="bestBidQuantity" header="Best bid quantity"></Column>

                    </DataTable>
                </div>
            </div>
        );
    }

export default MarketPairs;