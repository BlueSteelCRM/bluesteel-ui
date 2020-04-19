//import React from 'react';
import {toExpression,fromExpression} from './common';
import {BaseEdit,BaseView} from './ConditionBase';

const fields=[
	{name:"total_filter",
		type:"select",
		options:{
				">=":"Has more than",
				"<":"Has less than",
		}
	},
	{name:"total",type:"number",description:"In total giving"},
	{name:"date_filter",
		type:"select",
		options:{
				"":"All Time",
				">=":"Since",
				"<":"Before",
		}
	},
	{name:"date",type:"date",display:v=>!!v.date_filter}
];

function toCondition(values){
	let {total_filter,total,date_filter,date}=values;
	let condition={
		target:"Transactions",
		expression:date_filter?toExpression({field:"ts",operator:date_filter,value:date}):"",
		having:toExpression({field:"sum(amount)",operator:total_filter,value:total})
	}
	return condition;
}

function fromCondition(condition){
	let values={};
	{let {operator,value}=fromExpression(condition.expression);
	 	Object.assign(values,{date_filter:operator,date:value});
	}
	{let {operator,value}=fromExpression(condition.having);
	 	Object.assign(values,{total_filter:operator,total:value});
	}
	console.log("Transaction parsed values ",values);
	return values;
}

function Edit(props){return BaseEdit(Object.assign({},props,{fields,fromCondition,toCondition}));}
function View(props){return BaseView(Object.assign({},props,{fields,fromCondition,toCondition}));}

export default {Edit,View,label:"Transactions"};
