import React from 'react';
import QueryBuilder from '../components/QueryBuilder';

export default function Edit(props){
	const [query, setQuery]=React.useState(null);

	return <QueryBuilder
					query={query}
					onChange={(config)=>{
						console.log("New config:",config);
					}}
				/>
		;
}
