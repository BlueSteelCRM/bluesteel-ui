import React from 'react';
import './styles/App.css';
import Layout from './Layout';

import {Router} from 'react-router-dom';
import { createBrowserHistory } from "history";

import { Provider,createClient, dedupExchange, fetchExchange } from 'urql';
import { cacheExchange } from '@urql/exchange-graphcache';
const client = createClient({
  url: 'http://localhost:5000/graphql',
  exchanges: [
    dedupExchange,
    // Replace the default cacheExchange with the new one
    cacheExchange({
      /* config */
    }),
    fetchExchange,
  ],
});

function App() {
  return (
		<Router history={createBrowserHistory()}>
			<Provider value={client}>
				<Layout/>
			</Provider>
		</Router>
  );
}

export default App;
