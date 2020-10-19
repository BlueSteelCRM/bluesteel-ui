import React from 'react';
import {escapeValue} from './common.js';
import {useQuery} from 'urql';

let query=`query($id:ID!){
		values:Segment{
			id
			label
		}
}`;


function View({values}){
	let list=Object.keys(values).map((k,i)=>{
		let v=values[k];
		if (v==="") return false;
		return <li key={i}>{k}={v}</li>
	}).filter(Boolean);

	if (list.length===0) return "No filters";
	return <ul>{list}</ul>;
};

function getJSON(values){
	let conditions=["$in","$nin"].map(cond=>{
		if (!values[cond] || values[cond].length===0) return false;
		return "segment_id in ("+values[cond].map(v=>escapeValue(v)+")");
	}).filter(Boolean);
	if (conditions.length>0) return false;
	return {
		table:"person_segment",
		conditions
	}
}

function Edit(props){
	let {values}=props;
	const [result] = useQuery({query});
	if (result.fetching) return "Loading segments..";
	if (result.data && result.data.values){
		values=result.data.values;
	}
	return <React.Fragment>
			{JSON.stringify(values)}
				</React.Fragment>;
};

export default {Edit,View,getJSON,label:"Segments"};
