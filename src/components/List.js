import React,{useContext} from 'react';
import {SchemaContext} from '../SchemaContext';
import {CustomLayoutContext} from '../CustomLayoutContext';
import AutoTable from './AutoTable';

import Alert from '@material-ui/lab/Alert';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/ToolBar';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';

import Paper from '@material-ui/core/Paper';


import {useQuery} from 'urql';
import {useParams} from 'react-router-dom';
import ObjectWrapper from './ObjectWrapper';
import {commonStyles} from '../theme/Styles';
import {useHistory} from 'react-router-dom';

function RetrieveData({object,query,columns}){
	const classes=commonStyles();
	const [result] = useQuery({query});
	const history=useHistory();
	let layouts=useContext(CustomLayoutContext);
	const { data, fetching, error } = result;
	if (fetching) return null;
	if (error){
		return <Alert severity="error">{JSON.stringify(error)}</Alert>;
	}

	let rows=[];
	if (data && data.listResult){
		rows=data.listResult.map(row=>{
			for (let i in row){
				if (typeof row[i]=='object') row[i]=JSON.stringify(row[i]);
			}
			return Object.assign({},row);
		});
	}

	let CustomLayout=layouts[object]?.List;
	if (typeof CustomLayout=='function'){
		console.log("Using custom layout for ",object);
		return React.createElement(layouts[object].List,{object,rows,classes});
	};

	if (CustomLayout?.columns){
		columns=layouts[object].List.columns;
	}


	let detailPanel=CustomLayout?.detailPanel;
	let onRowClick=null;

	if (detailPanel){
		onRowClick=CustomLayout?.onRowClick || ((event, rowData, togglePanel) => togglePanel());
	}else{
		onRowClick=CustomLayout?.onRowClick || ((e,row)=>{history.push("/obj/"+object+"/"+row.id+"/edit")});
	}


  return <Box display="flex">
		<ObjectWrapper object={object}>
			<div className={classes.contentWrapper}>
			<Paper className={classes.paper}>
				<AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
					<Toolbar>
						<Grid container spacing={2} alignItems="center">
							<Grid item>
								<SearchIcon className={classes.block} color="inherit" />
							</Grid>
							<Grid item xs>
								<TextField
									fullWidth
									placeholder="Search"
									InputProps={{
										disableUnderline: true,
										className: classes.searchInput,
									}}
								/>
							</Grid>
							<Grid item>
								<AddIcon className={classes.block} color="inherit"
								onClick={e=>history.push("/obj/"+object+"/edit")}/>
							</Grid>
						</Grid>
					</Toolbar>
				</AppBar>

		     <AutoTable
		        columns={columns}
		        data={rows}
						onRowClick={onRowClick}
						detailPanel={detailPanel}
						/>
			</Paper>
			</div>
		</ObjectWrapper>
	</Box>
};

export default function List(props){
	let { object } = useParams();
	let schema=useContext(SchemaContext);
	let layouts=useContext(CustomLayoutContext);
	console.log("Listing ",object);

	if (typeof (layouts[object]?.List)==='function'){
		console.log("Returning custom object");
		return layouts[object].List(props);
	}

	let def=schema.objects[object];
	if (!def) return "Could not find object "+object+" in "+Object.keys(schema.objects);
	let {fields}=def;
	let q=fields.slice(0,20).map(d=>d.name);
	let query=`query {
			listResult: ${object}List{
				${q.join("\n")}
			}
	}`;
	let columns=props.columns;
	if (!columns) columns=q.map(field=>{
		if (field==='id' || field.slice(-3)==='_id' || field==='created_at') return false;
		return {title:field,field}
	}).filter(Boolean);

	return <RetrieveData query={query} object={object} columns={columns}/>;
};
