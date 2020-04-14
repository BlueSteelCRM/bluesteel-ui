import React from 'react';
import Paper from '@material-ui/core/Paper';
import SaveableTable from '../components/SaveableTable';
import SaveableForm from '../components/SaveableForm';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

function TabPanel({index,value,classes,children}){
	return <Paper hidden={index!==value} style={{"padding":"10px"}}>{children}</Paper>
}

export default function PersonEdit(props){
	let {classes}=props;
	const [tabIndex, setTabIndex] = React.useState(0);
	return	<div className={classes.contentWrapper}>
		<Card>
			<CardHeader title={[props.values.given_name,props.values.family_name].filter(Boolean).join(" ")}/>
			<AppBar position='static'>
				<Tabs value={tabIndex} onChange={(e,t)=>setTabIndex(t)}>
					<Tab label="Contact" id="tab-contact"/>
					<Tab label="Segments" id="tab-segments"/>
					<Tab label="Transactions" id="tab-transactions"/>
				</Tabs>
			</AppBar>
			<CardContent>
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
				<TabPanel value={tabIndex} index={2} classes={classes}><SaveableTable object='Transactions'title="Transactions"/></TabPanel>
			</CardContent>
		</Card>
	</div>;
}
