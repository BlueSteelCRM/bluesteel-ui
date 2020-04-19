import {BaseEdit,BaseView} from './ConditionBase';

const fields=[
	{name:"field",
		type:"select",
		options:{
				"given_name":"First Name",
				"family_name":"Last Name",
				"email":"Email"
		}
	},
	{name:"operator",type:"select",
		options:{
				"=":"Equals",
				"!=":"Not equal",
				"starts_with":"Starts with",
				"ends_with":"Ends with",
				"contains":"Contains",
				"not like":"Does not contain",
				"in":"Is in list",
				"!in":"Is not in list",
				"like":"Like",
		}
	},
	{name:"value"}
];
function Edit(props){return BaseEdit(Object.assign({},props,{fields}));}
function View(props){return BaseView(Object.assign({},props,{fields}));}

export default {Edit,View,label:"Person Data"};
