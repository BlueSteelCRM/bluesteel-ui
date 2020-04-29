import React from 'react';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import SaveableTable from '../components/SaveableTable';
import SaveableForm from '../components/SaveableForm';


function TabPanel({index,value,classes,children}){
	return <Paper hidden={index!==value} style={{"padding":"10px"}}>{children}</Paper>
}

function NewPerson(props){
	const {classes}=props;
	return (
		<div className={classes.contentWrapper}>
			<Paper className={classes.paper}>
				<AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
					<Toolbar><Typography variant="h6">Add a new Person</Typography></Toolbar>
				</AppBar>
		 		<SaveableForm {...props}/>
		 </Paper>
		 </div>
	 );
};

export default function PersonEdit(props){
	const {classes}=props;
	const [tabIndex, setTabIndex] = React.useState(0);
	if (!props.id) return <NewPerson {...props}/>;
	const title=[props.values.given_name,props.values.family_name].filter(Boolean).join(" ");
	return	<div className={classes.contentWrapper}>
	<Paper className={classes.paper}>
		<AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
			<Toolbar>
				<Typography variant="h6">{title}</Typography>
				<Tabs value={tabIndex} onChange={(e,t)=>setTabIndex(t)}>
					<Tab label="Contact" id="tab-contact"/>
					<Tab label="Segments" id="tab-segments"/>
					<Tab label="Transactions" id="tab-transactions"/>
				</Tabs>
			</Toolbar>
		</AppBar>

			<TabPanel value={tabIndex} index={0} classes={classes}>
				<Grid container spacing={4}>
			 		<Grid item xs={12} md={6}>
						<SaveableForm {...props}/>
			 		</Grid>
			 		<Grid item xs={12} md={6}>
						<SaveableTable title="Emails" object="PersonEmail" filter={{person_id:parseInt(props.id)}} fields={['email']}/>
						<SaveableTable title="Phones" object="PersonPhone" filter={{person_id:parseInt(props.id)}} fields={['phone']}/>
					</Grid>
				</Grid>
			</TabPanel>
			<TabPanel value={tabIndex} index={1} classes={classes}><SaveableTable object='SegmentPerson' title="Segments"/></TabPanel>
			<TabPanel value={tabIndex} index={2} classes={classes}><SaveableTable object='Transaction'title="Transactions"/></TabPanel>
		</Paper>
	</div>;
}
