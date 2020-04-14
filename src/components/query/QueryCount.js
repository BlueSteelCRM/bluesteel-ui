import React from 'react';
import {useQuery} from 'urql';

let query=`query($id:ID!){
		values:Segment{
			id
			label
		}
}`;

export default function QueryCount(props){
	const [result] = useQuery({query});
	if (result.fetching) return "Loading query count..";
	return <React.Fragment>
			{JSON.stringify(result.data)}
			</React.Fragment>;
};
