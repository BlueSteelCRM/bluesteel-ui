import React from 'react';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
//import SaveableForm from '../components/SaveableForm';
import {DropzoneArea} from 'material-ui-dropzone'


function TabPanel({index,value,classes,children}){
	return <Paper hidden={index!==value} style={{"padding":"10px"}}>{children}</Paper>
}

function NewFile(props){
	const {classes}=props;
	const [files,changeFiles]=React.useState([]);

	return (
		<div className={classes.contentWrapper}>
			<Paper className={classes.paper}>
				<AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
					<Toolbar><Typography variant="h6">Import a file</Typography></Toolbar>
				</AppBar>
				<Paper style={{"padding":"10px"}}>
		 			<DropzoneArea onChange={changeFiles}/>
					{JSON.stringify(files)}
				</Paper>
		 </Paper>
		 </div>
	 );
};

export default function PersonEdit(props){
	const {classes}=props;
	const [tabIndex, setTabIndex] = React.useState(0);
	if (!props.id) return <NewFile {...props}/>;
	const title=[props.values.given_name,props.values.family_name].filter(Boolean).join(" ");
	return	<div className={classes.contentWrapper}>
	<Paper className={classes.paper}>
		<AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
			<Toolbar>
				<Typography variant="h6">{title}</Typography>
				<Tabs value={tabIndex} onChange={(e,t)=>setTabIndex(t)}>
					<Tab label="Settings" id="tab-0"/>
					<Tab label="Status" id="tab-1"/>
				</Tabs>
			</Toolbar>
		</AppBar>
			<TabPanel value={tabIndex} index={0} classes={classes}>TODO</TabPanel>
			<TabPanel value={tabIndex} index={1} classes={classes}>TODO</TabPanel>

		</Paper>
	</div>;
}
