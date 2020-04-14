import React from "react";
import { v4 as uuid } from "uuid";
//import {SchemaContext} from '../SchemaContext';
import { withStyles } from '@material-ui/core/styles';
import {commonStyles} from '../../theme/Styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';

import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
//import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Nestable from 'react-nestable';
import PersonFields from './PersonFields';
import Segments from './Segments';
import Transactions from './Transactions';
//import QueryCount from './QueryCount';

import "./queryStyles.css";

let options=[
	{label:"People Fields",secondary:"Name, Email, etc",type:"PersonFields",component:PersonFields},
	{label:"Segments",type:"Segments",secondary:"Membership and exclusions",component:Segments},
	{label:"Transactions",type:"Transactions",component:Transactions},
]


function RenderJSON(props){
	return JSON.stringify(props);
};

function EditCondition(props){
	const {values,type,label,removeCondition,setValues}=props;

	if (!type){
		return 'No type specified';
		//return "Trying to render, no type in "+Object.keys(props || {error_no_item:true});
	}
	let Edit=null;
	let element=options.find(d=>d.type===type);
	Edit=RenderJSON;
	if (element){
		Edit=element.component.Edit;
	}
	return <Card>
	<CardHeader title={label || type}
	action={removeCondition&&
          <IconButton aria-label="remove"
					onClick={removeCondition}
					>
            <CloseIcon />
          </IconButton>
        }
	/>
	<CardContent>
		<Edit values={values} setValues={setValues}/>
	</CardContent>
	</Card>;
}


function QueryEditor(props){
	const {conditions,setConditions}=props;

	function removeCondition(arr,id){
		if (!arr) return false;
		let index=arr.findIndex(d=>d.id===id);
		if (index>=0){
			arr.splice(index,1);
			setConditions(JSON.parse(JSON.stringify(conditions)));
			return false;
		}
		arr.forEach(a=>removeCondition(a.children,id));
	}

	function getCondition(arr,id){
		let item=arr.find(d=>d.id===id);
		if (item) return item;
		//look in each conditions children
		item=arr.map(el=>{
			if (!el.children) return false;
			return getCondition(el.children,id);
		}).filter(Boolean);
		if (!item[0]){
			console.error("Could not find id",id);
			return null;
		}
		return item[0];
	}

	function setValues(id){
		return function(values){
			let item=getCondition(conditions,id);
			if (!item){
				console.error("Could not find item "+id+" in ",conditions);
				return false;
			}
			item.values=values;
			setConditions(JSON.parse(JSON.stringify(conditions)));
		}
	}

	const renderCondition = ({ item:condition }) => {
			return <div className="query-item">
			<EditCondition {...condition} removeCondition={()=>removeCondition(conditions,condition.id)} setValues={setValues(condition.id)}/>
			</div>;
	};

  return <div>
	<Nestable
    items={conditions}
    renderItem={renderCondition}
		maxDepth={1}
  />
	{JSON.stringify(conditions)}
	</div>
}


function toQuery(conditions){
	let o=
}


/*
let sample={
	outputs: [{
	name: 'total',
	expression: 'count(*)',
	}],
	conditions:[{
		and: [
		{
			expression: 'family_name = "Zoolander"'
		},
		{
			target: 'Transaction',
			having: 'amount > 10 and ts > date_sub(now(), interval 6 month)'
		},
		{
			or: [{
				expression: 'given_name="Derek"'
			},{
				expression: 'given_name="Larry"'
			}]
		}]
	}]
}
*/

export default withStyles(commonStyles)(function({classes}){

	const [conditions,setConditions] = React.useState(
		[
			{ id: 0, type:"PersonFields",target:"person",expression:"family_name='Zoolander'"},
			{
				id: 1,
				type:"and",
				children: [
					{ id: 2, type: 'PersonFields',target:"person",expression:"email='none_at_none'"},
					{ id: 2, type: 'Tranaction',target:"transaction",having: 'amount > 10 and ts > date_sub(now(), interval 6 month)'}
				]
			},
			{ id: 3, type: 'Segments', values:{} }
		]
	);

	function addCondition(item){
		let newConditions=conditions.concat({id:uuid(),type:item.type});
		setConditions(JSON.parse(JSON.stringify(newConditions)));
	}

  return (
		<div className={classes.contentWrapper}>
		<Paper className={classes.paper}>
			<AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
				<Toolbar>
					<Grid container spacing={2} alignConditions="center">
						<Grid item>
							Query Editor
						</Grid>
						<Grid item xs>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
				<Grid container>
					<Grid item xs={9}>
						<QueryEditor conditions={conditions} setConditions={setConditions}/>
					</Grid>
					<Grid item xs={3} className="query-options-wrapper">
		        <h2>Query Options</h2>
						<List>
						{options.map((o,i)=>(
							<ListItem key={i}>
                <ListItemText
                  primary={o.label}
                  secondary={o.secondary?o.secondary:null}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="add">
                    <AddIcon onClick={e=>addCondition(o)}/>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
							))}
						</List>
					</Grid>
				</Grid>
		</Paper>
		</div>
  );
});
