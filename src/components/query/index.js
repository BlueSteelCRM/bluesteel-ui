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
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Nestable from 'react-nestable';
import PersonFields from './PersonFields';
import Segments from './Segments';
import Transactions from './Transactions';

import "./queryStyles.css";

let options=[
	{label:"People Fields",secondary:"Name, Email, etc",type:"",values:{},component:PersonFields},
	{label:"Segments",type:"",secondary:"Membership and exclusions",values:{},component:Segments},
	{label:"Transactions",type:"",values:{},component:Transactions},
]



function RenderJSON(props){
	return JSON.stringify(props);
};

function EditItem(props){
	const {values,type,label,removeItem,setValues}=props;
	if (!type){
		return 'No type specified';
		//return "Trying to render, no type in "+Object.keys(props || {error_no_item:true});
	}
	let Edit=null;
	switch(type){
		case "PersonFields":Edit=PersonFields.Edit; break;
		default:
			Edit=RenderJSON;
	}
	return <Card>
	<CardHeader title={label || type}
	action={removeItem&&
          <IconButton aria-label="remove"
					onClick={removeItem}
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


function QueryDisplay(props){
		const [items,setItems] = React.useState([
	  { id: 0, type:"PersonFields",values:{} },
	  {
	    id: 1,
	    children: [
	      { id: 2, type: 'PersonFields',values:{} }
	    ]
	  },
	  { id: 3, type: 'Segments', values:{} }
	]);

	function removeItem(arr,id){
		if (!arr) return false;
		let index=arr.findIndex(d=>d.id===id);
		if (index>=0){
			arr.splice(index,1);
			setItems(JSON.parse(JSON.stringify(items)));
			return false;
		}
		arr.forEach(a=>removeItem(a.children,id));
	}

	function getItem(arr,id){
		let item=arr.find(d=>d.id===id);
		if (item) return item;
		//look in each items children
		item=arr.map(el=>{
			if (!el.children) return false;
			return getItem(el.children,id);
		}).filter(Boolean);
		if (!item[0]){
			console.error("Could not find id",id);
			return null;
		}
		return item[0];
	}

	function setValues(id){
		return function(values){
			let item=getItem(items,id);
			if (!item){
				console.error("Could not find item "+id+" in ",items);
				return false;
			}
			item.values=values;
			setItems(JSON.parse(JSON.stringify(items)));
		}
	}

	const renderItem = ({ item }) => {
			return <div className="query-item">
			<EditItem {...item} removeItem={()=>removeItem(items,item.id)} setValues={setValues(item.id)}/>
			</div>;
	};

  return <div>
	{JSON.stringify(items)}
	<Button onClick={e=>setItems(items.concat({id:uuid(),text:uuid()}))}>Add</Button>
	<Nestable
    items={items}
    renderItem={renderItem}
  />
	</div>

}

export default withStyles(commonStyles)(function({classes}){

  return (
		<div className={classes.contentWrapper}>
		<Paper className={classes.paper}>
			<AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
				<Toolbar>
					<Grid container spacing={2} alignItems="center">
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
						<QueryDisplay/>
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
                    <AddIcon />
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
