import React from 'react';
import AutoForm from '../AutoForm';
import {toCondition,fromCondition} from './common.js';

export function BaseView({values}){
	let list=Object.keys(values).map((k,i)=>{
		let v=values[k];
		if (v==="") return false;
		return <li key={i}>{k}={v}</li>
	}).filter(Boolean);

	if (list.length===0) return "No filters";
	return <ul>{list}</ul>;
};

export function BaseEdit({fields,condition,
		setCondition,
		toCondition:toConditionOverride,
		fromCondition:fromConditionOverride}){
	if (!condition) return "Condition required, even if empty";
	if (typeof setCondition!='function') return "setCondition must be a function";

	let formValues=(fromConditionOverride || fromCondition)(condition) || {};

	function onChange(v){
		let newVals=(toConditionOverride || toCondition)(v)
		let newCondition=Object.assign({},condition,newVals);
		setCondition(newCondition)
	}

	return <div><AutoForm
					onChange={onChange}
					fields={fields}
					values={formValues}
					submit_button={false}
				/>
				</div>
};
