import React from 'react';
import {useQuery} from 'urql';

let query=`query ($conditions:[BlueSteelQueryComponentInput]){
  ExecutePersonQuery(conditions:$conditions){
  	count
	}
}`;

export default function QueryCount(props){
	const {conditions=[]}=props;
	const [result] = useQuery({query,variables:{conditions}});
	if (result.fetching) return "Loading query count..";
	if (result.error){
		console.error("Invalid query:",conditions);
		console.error("Query error",result.error);
		return "(Invalid query)";
	}
	if (!result.data.ExecutePersonQuery) return "N/A";
	return <React.Fragment>
			{result.data.ExecutePersonQuery.count}
			{/*<pre>{JSON.stringify(conditions,null,2)}</pre>*/}
			</React.Fragment>;
};
