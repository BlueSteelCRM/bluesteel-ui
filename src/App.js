import React from 'react';
import './App.css';
import Paperbase from './Paperbase';

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
		<Provider value={client}>
			<Paperbase/>
		</Provider>
  );
}

export default App;
