import React,{useContext} from 'react';
import {SchemaContext} from '../SchemaContext';


import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/ToolBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import Paper from '@material-ui/core/Paper';


import {useQuery} from 'urql';
import {useParams} from 'react-router-dom';
import ObjectHeader from './ObjectHeader';
import { withStyles } from '@material-ui/core/styles';
import {commonStyles} from '../theme/Styles';

const Query=withStyles(commonStyles)(({object,query,classes})=>{
	const [result] = useQuery({
    query,
    requestPolicy: 'cache-only',
  });
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
						<Grid item>
							<Button variant="contained" color="primary" className={classes.addObject}>
								Add user
							</Button>
							<Tooltip title="Reload">
								<IconButton>
									<RefreshIcon className={classes.block} color="inherit" />
								</IconButton>
							</Tooltip>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
			<div className={classes.contentWrapper}>
					{JSON.stringify(result)}
			</div>
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
	let q=fields.slice(0,4).map(d=>d.name);
	let query=`query {
			${object}List{
				${q.join("\n")}
			}
	}`;
	return <Query query={query} object={object}/>;
};
