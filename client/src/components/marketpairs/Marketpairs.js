import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import '../../index.css';
import ReactDOM from 'react-dom';

import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { setRef } from '@material-ui/core';

export default function DataTableStripedDemo() {
    const [products, setProducts] = useState(null);
        
    function connectSocketStreams(streams) {
        streams = streams.join('/');
        let connection = btoa(streams);
        connection = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);
        connection.onmessage = evt => { 
            var x = JSON.parse(evt.data).data
            setProducts(x)
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
                        <Column field="e" header="Event type"></Column>
                        <Column field="E" header="Event time"></Column>
                        <Column field="s" header="Symbol"></Column>

                        <Column field="c" header="Last price"></Column>
                        <Column field="Q" header="Last quantity"></Column>
                        <Column field="b" header="Best bid price"></Column>
                        <Column field="B" header="Best bid quantity"></Column>

                    </DataTable>
                </div>
            </div>
        );
    }
