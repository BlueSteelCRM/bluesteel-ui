import React from 'react';
import AutoForm from '../AutoForm';
import {escapeValue} from './common.js';

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
	let {values,setValues}=props;
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
	values=values || {
		email:"foo@test.com"
	}

	return <React.Fragment>
				<AutoForm
					onChange={setValues}
					fields={fields}
					values={values}
					submit_button={false}
				/>
				</React.Fragment>
};
export default {Edit,View,getJSON,label:"Person Data"};
