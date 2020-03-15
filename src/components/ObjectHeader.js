import React from 'react';
import AppBar from '@material-ui/core/AppBar';

/*
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
*/

import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';


import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import pluralize from 'pluralize';

import { withStyles } from '@material-ui/core/styles';
import {headerStyles} from '../theme/Styles.js';
import {useHistory} from 'react-router-dom';

function ObjectHeader(props) {
  let { classes,title,object } = props;
	const history=useHistory();
	if (!object) return "No Object";
	let plural=pluralize(object);

	if (!title){
		let parts=history.location.pathname.split("/");
		switch(parts.pop()){
			case 'edit':title="Edit "+object; break;

		default: title="List "+object;
		}
	}
  return (<React.Fragment>
		{/*
		<AppBar
			component="div"
			className={classes.secondaryBar}
			color="primary"
			position="static"
			elevation={0}
		>
			<Toolbar>
				<Grid container alignItems="center" spacing={1}>
					<Grid item xs>
						<Typography color="inherit" variant="h5" component="h1">
						{title}
						</Typography>
					</Grid>

					<Grid item>
						<Button className={classes.button} variant="outlined" color="inherit" size="small">
							Web setup
						</Button>
					</Grid>
					<Grid item>
						<Tooltip title="Help">
							<IconButton color="inherit">
								<HelpIcon />
							</IconButton>
						</Tooltip>
					</Grid>

				</Grid>
			</Toolbar>
		</AppBar>
		*/}
		<AppBar
			component="div"
			className={classes.secondaryBar}
			color="primary"
			position="static"
			elevation={0}
		>
			<Tabs
				value={history.location.pathname}
				textColor="inherit"
				onChange={(e,v)=>history.push(v)}>
				<Tab icon={<ListIcon/>} textColor="inherit" label={`List ${plural.toLowerCase()}`} value={`/obj/${object}`} index={0}/>
				<Tab icon={<AddIcon/>} textColor="inherit" label={`Add a ${object.toLowerCase()}`} value={`/obj/${object}/edit`} index={1}/>
			</Tabs>
		</AppBar>
		</React.Fragment>
  );
}

export default withStyles(headerStyles)(ObjectHeader);
