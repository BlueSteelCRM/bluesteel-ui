import React from 'react';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import SaveableForm from '../components/SaveableForm';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

function TabPanel({index,value,classes,children}){
	return <Paper hidden={index!==value}>{children}</Paper>
}


export default function PersonEdit(props){
	let {object,fields,values={},classes}=props;
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
			<TabPanel value={tabIndex} index={1} classes={classes}>Contact</TabPanel>
			<TabPanel value={tabIndex} index={2} classes={classes}>Segments</TabPanel>
			<TabPanel value={tabIndex} index={3} classes={classes}>Transactions</TabPanel>
			</Paper>
		</div>;
}
