import React from 'react';
//import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';

import Box from '@material-ui/core/Box';
/*
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
*/

import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';

import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import {NavLink} from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import pluralize from 'pluralize';

import {headerStyles} from '../theme/Styles.js';
import {useHistory} from 'react-router-dom';


function SideContent(props){
	let {object}=props;
	let plural=pluralize(object);
	return <List disablePadding>

		<ListItem component={NavLink} to={`/obj/${object}/edit`}>
			<ListItemIcon>
				<AddIcon />
			</ListItemIcon>
			<ListItemText>
			Add a new {object}
			</ListItemText>
		</ListItem>
		<ListItem component={NavLink} to={`/obj/${object}`}>
			<ListItemIcon>
				<ListIcon />
			</ListItemIcon>
			<ListItemText>
			List {plural}
			</ListItemText>
		</ListItem>
	</List>
}


function ObjectWrapperWithDrawer(props){
	const classes=headerStyles();
  let { title,object } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const history=useHistory();
	if (!object) return "No Object";
	if (!title){
		let parts=history.location.pathname.split("/");
		switch(parts.pop()){
			case 'edit':title="Edit "+object; break;

		default: title="List "+object;
		}
	}
	const drawerWidth="200px";
  return (<Box display="flex" flexDirection="row" style={{flex:1,backgroundColor:"#FFF"}}>
					<Hidden smUp implementation="js">
							<Drawer
								PaperProps={{ style: { width: drawerWidth } }}
								variant="temporary"
								open={mobileOpen}
								onClose={handleDrawerToggle}
							><SideContent object={object}/>
							</Drawer>
					</Hidden>
					<Hidden xsDown implementation="css">
						<Box style={{ width: drawerWidth }}>
							<SideContent object={object}/>
						</Box>
					</Hidden>
					<Box flexGrow={1}>
						<Hidden smUp>
							<Toolbar>
								<Grid item>
									<IconButton
										color="inherit"
										aria-label="open drawer"
										onClick={handleDrawerToggle}
										className={classes.menuButton}
									>
										<MenuIcon />
									</IconButton>
								</Grid>
							</Toolbar>
						</Hidden>
						<div id="content">
							{props.children}
						</div>
					</Box>
			</Box>);
}
export {ObjectWrapperWithDrawer};

function ObjectWrapper(props){
	return <Box style={{flex:1}}>{props.children}</Box>
}

export default ObjectWrapper;
