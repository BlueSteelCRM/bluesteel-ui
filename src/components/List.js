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

function RetrieveData({object,query,fields,columns}){
	const classes=commonStyles();
	const [result] = useQuery({query});
	const history=useHistory();
	let layouts=useContext(CustomLayoutContext);
	const { data, fetching, error } = result;
	if (fetching) return null;
	if (error){
		return <Alert severity="error">{JSON.stringify(error)}</Alert>;
	}

	if (layouts && layouts[object] && layouts[object].List && layouts[object].List.columns){
		columns=layouts[object].List.columns;
	}

	if (!columns) columns=fields.map(field=>{
		if (field==='id' || field.slice(-3)==='_id' || field==='created_at') return false;
		return {title:field,field}
	}).filter(Boolean);

	let rows=[];
	if (data && data.listResult) rows=data.listResult;


	let detailPanel=layouts[object]?.List?.detailPanel;
	let onRowClick=null;

	if (detailPanel){
		onRowClick=layouts[object]?.List?.onRowClick || ((event, rowData, togglePanel) => togglePanel());
	}else{
		onRowClick=layouts[object]?.List?.onRowClick || ((e,row)=>{history.push("/obj/"+object+"/"+row.id+"/edit")});
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

	if (typeof (layouts[object]?.List)==='function'){
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

	return <RetrieveData query={query} object={object} fields={q} columns={props.columns}/>;
};
