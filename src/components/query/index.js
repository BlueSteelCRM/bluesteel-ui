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
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import QueryCount from './QueryCount';
import AddIcon from '@material-ui/icons/Add';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import CloseIcon from '@material-ui/icons/Close';
//import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Nestable from 'react-nestable';
import PersonField from './PersonField';
import Segment from './Segment';
import Transaction from './Transaction';

import "./queryStyles.css";

let options=[
	{label:"People Fields",secondary:"Name, Email, etc",target:"PersonField",component:PersonField},
	{label:"Segments",target:"Segment",secondary:"Membership and exclusions",component:Segment},
	{label:"Transactions",target:"Transaction",component:Transaction},
]

function RenderJSON(props){
	return <pre>{JSON.stringify(props,null,2)}</pre>;
};

function EditCondition({condition,setCondition,removeCondition}){
	const {target,label}=condition;

	if (!target){
		return 'No target specified';
	}
	let Edit=null;
	let element=options.find(d=>d.target===target);
	if (element){
		Edit=element.component.Edit;
	}
	if (!Edit) return "Could not find element with target "+target;
	return <ListItem>
		<Edit condition={condition} setCondition={setCondition}/>
			<ListItemSecondaryAction>
	          <IconButton aria-label="remove"
						onClick={removeCondition}
						>
	            <CloseIcon />
	          </IconButton>
	</ListItemSecondaryAction>
	</ListItem>;
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

	function getSetCondition(id){
		return function(condition){
			let item=getCondition(conditions,id);
			if (!item){
				console.error("Could not find item "+id+" in ",conditions);
				return false;
			}
			item=Object.assign(item,condition);
			setConditions(JSON.parse(JSON.stringify(conditions)));
		}
	}

	const renderCondition = ({ item:condition,handler }) => {
		if (!condition.target) return <div>ERROR -- no condition target</div>;
		if (condition.target==="and" || condition.target==="or"){
			let message="All of the following ('and')";
			if (condition.target==="or") message="Any of the following ('or')";
				return <div className={`query-condition-${condition.target}`}>
					<div></div>
					<div>{message}</div>
					<div>
						{condition.children?.length===0 && <IconButton aria-label="remove" onClick={()=>removeCondition(conditions,condition.id)}><CloseIcon /></IconButton>}
					</div>
					{handler}
				</div>
		};

			return <div className="query-condition">
					<EditCondition condition={condition} removeCondition={()=>removeCondition(conditions,condition.id)} setCondition={getSetCondition(condition.id)}/>
					{handler}
				</div>
			;
	};

	function confirmChange(dragItem,destinationParent){
		if (!destinationParent) return true;
		if (["and","or"].indexOf(destinationParent.target)>=0) return true;
		return false;
	}

  return <div className="query-editor">
	<Nestable
		onChange={(items)=>setConditions(items)}
    items={conditions}
    renderItem={renderCondition}
		confirmChange={confirmChange}
		handler={null}
		maxDepth={3}
  />
	</div>
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
			{ id: uuid(),
				target:"Transaction",
				expression: 'date_created >= "2019-01-01"',
				having: 'sum(amount) >= 100'},
				{
					id: uuid(),
					target:"or",
					children: [
						{ id: uuid(),
							target:"PersonField",
							expression:"email like '%gmail.com'"},
						{ id: uuid(), target: 'PersonField',
						expression:"family_name like 'Smith%'"},
						//{ id: uuid(), type: 'Transactions',target:"transaction",having: 'amount > 10 and ts > date_sub(now(), interval 6 month)'}
				]
		}]
	);

	function addCondition(item){
		let newConditions=conditions.concat({id:uuid(),target:item.target});
		setConditions(JSON.parse(JSON.stringify(newConditions)));
	}

	function cleanConditions(_c){
		if (typeof _c!='object') return _c;
		let c=JSON.parse(JSON.stringify(_c));
		if (Array.isArray(c)){
			return c.map(d=>{
				delete d.id;
				return cleanConditions(d);
			});
		}
		delete c.id;
		let o={};
		for (let i in c){
			if (i==="children") continue;
			if (i==="target"){
				if (["and","or"].indexOf(c[i])>=0){
						o[c[i]]=cleanConditions(c.children||[]);
				}
				continue;
			}
			o[i]=cleanConditions(c[i]);
		}
		return o;
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
							<QueryCount conditions={cleanConditions(conditions)}/>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
				<Grid container>
					<Grid item xs={9}>
						<QueryEditor conditions={conditions} setConditions={setConditions}/>
						<ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
						<Button
				        variant="contained"
				        color="default"
				        className={classes.button}
				        startIcon={<AddIcon />}
								aria-label="add" onClick={e=>addCondition({target:"and"})}
				      >
				        Add "AND" group
				      </Button>
							<Button
					        variant="contained"
					        color="default"
					        className={classes.button}
					        startIcon={<AddIcon />}
									aria-label="add" onClick={e=>addCondition({target:"or"})}
					      >
					        Add "OR" group
					      </Button>
						</ButtonGroup>
						<RenderJSON json={conditions}/>
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
                  <IconButton edge="end" aria-label="add" onClick={e=>addCondition(o)}>
                    <AddIcon/>
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
