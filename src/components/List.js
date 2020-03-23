import React,{useContext} from 'react';
import {SchemaContext} from '../SchemaContext';
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
import { withStyles } from '@material-ui/core/styles';
import {commonStyles} from '../theme/Styles';
import {useHistory} from 'react-router-dom'

const RetrieveData=withStyles(commonStyles)(({object,query,fields,classes})=>{
	const [result] = useQuery({query});
	const history=useHistory();
	const { data, fetching, error } = result;
	if (fetching) return null;
	if (error){
		return <Alert severity="error">{JSON.stringify(error)}</Alert>;
	}

	let columns=fields.map(field=>{
		return {title:field,field}
	});

	let rows=[];
	if (data && data.listResult) rows=data.listResult;

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
						onRowClick={(e,row)=>{history.push("/obj/"+object+"/"+row.id+"/edit")}}
						/>
			</Paper>
			</div>
		</ObjectWrapper>
	</Box>
});

export default function List(props){
	let { object } = useParams();
	let schema=useContext(SchemaContext);
	let def=schema.objects[object];
	if (!def) return "Could not find object "+object+" in "+Object.keys(schema.objects);
	let {fields}=def;
	let q=fields.slice(0,20).map(d=>d.name);
	let query=`query {
			listResult: ${object}List{
				${q.join("\n")}
			}
	}`;
	return <RetrieveData query={query} object={object} fields={q}/>;
};
