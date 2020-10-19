import React from 'react';
import './App.css';
import Routes from './Routes';

import "bootstrap/dist/css/bootstrap.css";
import "./assets/scss/theme.scss?v=1.2.0";
import {Router} from 'react-router-dom';
import { createBrowserHistory } from "history";
import { Provider,createClient, dedupExchange, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
import {SchemaProvider} from './services/SchemaContext';

let endpoint=process.env.REACT_APP_DATA_LAYER;

const client = createClient({
  url: endpoint,
  exchanges: [
    dedupExchange,
    // Replace the default cacheExchange with the new one
    cacheExchange({}),
    fetchExchange,
  ],
});

function App() {
  return (
		<Router history={createBrowserHistory()}>
			<Provider value={client}>
				<SchemaProvider>
				<Routes/>
			</SchemaProvider>
			</Provider>
		</Router>
  );
}

export default App;
