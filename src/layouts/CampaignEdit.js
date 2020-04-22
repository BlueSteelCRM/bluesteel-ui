import React from 'react';
import Paper from '@material-ui/core/Paper';
import SaveableTable from '../components/SaveableTable';
import SaveableForm from '../components/SaveableForm';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';

function TabPanel({index,value,classes,children}){
	return <Paper hidden={index!==value} style={{"padding":"10px"}}>{children}</Paper>
}

export default function CampaignEdit(props){
	let {id,values,classes}=props;
	const [tabIndex, setTabIndex] = React.useState(0);
	const title=id?"Edit "+values.label:"Create a new Campaign";

	return	<div className={classes.contentWrapper}>
	<Paper className={classes.paper}>
		<AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
			<Toolbar>
				<Typography variant="h6">{title}</Typography>
				<Tabs value={tabIndex} onChange={(e,t)=>setTabIndex(t)}>
					<Tab label="Campaign Info" id="tab-contact"/>
				</Tabs>
			</Toolbar>
		</AppBar>
			<TabPanel value={tabIndex} index={0} classes={classes}>
				<SaveableForm {...props}/>
				{id && <SaveableTable title="Message Sets" object="MessageSet" filter={{campaign_id:parseInt(props.id)}} fields={['label']}/>}
			</TabPanel>
		</Paper>
	</div>;
}
