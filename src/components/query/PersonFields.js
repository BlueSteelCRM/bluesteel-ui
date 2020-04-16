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

function Edit({condition,setCondition}){
	if (!condition) return "Condition required, even if empty";
	if (typeof setCondition!='function') return "setCondition must be a function";
	const fields = [
		{name:"field",type:"select",
			values:{
					"given_name":"First Name",
					"family_name":"Last Name",
					"email":"Email"
			}
		},
		{name:"operator",type:"select",
			values:{
					"=":"Equals",
					"!=":"Not qquals",
					"starts_with":"Starts with",
					"ends_with":"Ends with",
					"contains":"Contains",
					"not like":"Does not contain",
					"in":"Is in list",
					"!in":"Is not in list"
			}
		},
		{name:"value"}
	];
	let formValues=fromCondition(condition);

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

	function onChange(v){
		let newCondition=Object.assign({},condition,toCondition(v));
		setCondition(newCondition)
	}

	return <React.Fragment>
				<AutoForm
					onChange={onChange}
					fields={fields}
					values={formValues}
					submit_button={false}
				/>
				</React.Fragment>
};
export default {Edit,View,getJSON,label:"Person Data"};
