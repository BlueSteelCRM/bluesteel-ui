import React from 'react';
import QueryBuilder from '../components/query';

export default function Edit(props){
	const [query, setQuery]=React.useState(null);

	return <QueryBuilder
					query={query}
					onChange={(config)=>{
						console.log("New config:",config);
						setQuery(config);
					}}
				/>
		;
}
