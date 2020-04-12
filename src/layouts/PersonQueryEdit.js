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


/*
let a={
responseType:"count",//<count>,<new_segment>,<existing_segment>,<file>  (could also be different endpoints)
query:{
	$and:[
		{table:"person_segment",conditions:[{"segment_id":123}]}, //Is a potential member
		[{$or:[
	 		{table:"transactions",conditions:["ts>-2y"],having:["sum(amount)>1000"]},  //and has given more than $1000 in the last 2 years
	 		{table:"transactions",having:["max(amount)>50"]} // or given any amount >$50
		]}],
		{table:"email_delivery",conditions:["status=opened","date>-1y"]} //and has opened an email in the last year
	]
}

*/
