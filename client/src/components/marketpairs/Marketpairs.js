import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';

import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function DataTableStripedDemo() {
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

            console.log(JSON.stringify(wsData))
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



        return (
            <div>
                <div className="card">
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <DataTable value={products} className="p-datatable-striped">
                        <Column field="eventType" header="Event type"></Column>
                        <Column field="eventTime" header="Ticker time"></Column>
                        <Column field="symbol" header="Symbol"></Column>
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
