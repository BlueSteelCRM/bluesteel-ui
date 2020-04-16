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
	return <React.Fragment>
			{result.data.ExecutePersonQuery.count}
			</React.Fragment>;
};
