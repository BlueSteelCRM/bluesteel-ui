import React from 'react';
import Paper from '@material-ui/core/Paper';
import EditableTable from '../components/EditableTable';
import SaveableForm from '../components/SaveableForm';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

function TabPanel({index,value,classes,children}){
	return <Paper hidden={index!==value} style={{"padding":"10px"}}>{children}</Paper>
}

export default function PersonEdit(props){
	let {classes}=props;
	const [tabIndex, setTabIndex] = React.useState(0);
	return	<div className={classes.contentWrapper}>
		<Paper className={classes.paper}>
			<AppBar position="static">
			<Tabs value={tabIndex} onChange={(e,t)=>setTabIndex(t)}>
				<Tab label="Overview" id="tab-overview"/>
				<Tab label="Contact" id="tab-contact"/>
				<Tab label="Segments" id="tab-segments"/>
				<Tab label="Transactions" id="tab-transactions"/>
			</Tabs>
			</AppBar>
			<TabPanel value={tabIndex} index={0} classes={classes}>
					<SaveableForm {...props}/>
			</TabPanel>
			<TabPanel value={tabIndex} index={1} classes={classes}>
				<Grid container spacing={4}>
				 <Grid item xs={12} md={6}><EditableTable title="Emails"/></Grid>
				 <Grid item xs={12} md={6}><EditableTable title="Phones"/></Grid>
				</Grid>
			</TabPanel>
			<TabPanel value={tabIndex} index={2} classes={classes}><EditableTable title="Segments"/></TabPanel>
			<TabPanel value={tabIndex} index={3} classes={classes}><EditableTable title="Transactions"/></TabPanel>
			</Paper>
		</div>;
}
