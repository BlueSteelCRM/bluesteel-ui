import React from 'react';
import {useQuery} from 'urql';
import {Alert} from 'react-bootstrap';


export function RetrieveData({object,variables,fields,children}){
	let query=`query($id:ID!){
		values:${object}(id:$id) {
			${fields.map(d=>d.name).join("\n")}
		}
	}`;

	const [result] = useQuery({
    query,
		variables
  });
	if (result.fetching) return null;
	if (result.error) return <Alert variant="error">{JSON.stringify(result.error)}</Alert>;
	let values={};
	if (result.data && result.data.values) values=result.data.values;
	return children(values);
};
