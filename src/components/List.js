import React,{useContext} from 'react';
import {SchemaContext} from '../SchemaContext';
import AutoTable from './AutoTable';


import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/ToolBar';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

import Paper from '@material-ui/core/Paper';


import {useQuery} from 'urql';
import {useParams} from 'react-router-dom';
import ObjectHeader from './ObjectHeader';
import { withStyles } from '@material-ui/core/styles';
import {commonStyles} from '../theme/Styles';
import {useHistory} from 'react-router-dom'

const RetrieveData=withStyles(commonStyles)(({object,query,fields,classes})=>{
	const [result] = useQuery({query});
	const history=useHistory();
	if (result.fetching) return "Loading...";

	let columns=fields.map(field=>{
		return {title:field,field}
	});

	let rows=[];
	if (result.data && result.data.listResult) rows=result.data.listResult;

  return <React.Fragment>
		<ObjectHeader object={object}/>
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
								placeholder="Search by email address, phone number, or user UID"
								InputProps={{
									disableUnderline: true,
									className: classes.searchInput,
								}}
							/>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
			<AutoTable onRowClick={row=>history.push("/obj/"+object+"/"+row.id+"/edit")}
					 rows={rows} columns={columns}/>
		</Paper>
		</div>
	</React.Fragment>
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
