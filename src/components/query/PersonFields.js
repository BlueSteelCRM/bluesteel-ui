import React from 'react';
import AutoForm from '../AutoForm';
import {escapeValue,toCondition,fromCondition} from './common.js';

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
	return {
		table:"person",
		conditions:Object.keys(values).map((k)=>{
					let v=values[k];
					if (v==="") return false;
					return k+"="+escapeValue(values[k]);
				}).filter(Boolean)
	}
}

function Edit(props){
	let {query,setQuery}=props;
	if (!query) return "Query required, even if empty";
	const fields = [
		{ name: 'given_name'},
		{ name: 'family_name'},
	 	{ name:"email",
			type:"email",
			required: 'Required',
			pattern: {
				value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
				message: "invalid email address"
			}
		}
	];
	let formValues={};
	(query.conditions||[]).map(fromCondition).forEach(c=>{
		formValues[c.name]=c.value;
	});

/*
[{
				and: [{
					expression: 'family_name = "Zoolander"'
				}, {
					or: [{
						expression: 'given_name="Derek"'
					},{
						expression: 'given_name="Larry"'
					}]
				}]
			}]
*/

	function setQueryValues(v){
		setQuery({table:"person",conditions:Object.keys(v).map(name=>{
			let value=v[name];
			if (!value) return false;
			let operator="=";
			return toCondition({name,operator,value});
		})
		});
	}

	return <React.Fragment>
				<AutoForm
					onChange={setQueryValues}
					fields={fields}
					values={formValues}
					submit_button={false}
				/>
				</React.Fragment>
};
export default {Edit,View,getJSON,label:"Person Data"};
