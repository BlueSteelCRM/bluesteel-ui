import React from 'react';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SaveableForm from '../components/SaveableForm';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import {TabPanel} from '../components/Tabs';

import './FormEdit.scss';


function NewForm(props){
	const {classes}=props;
	return (
		<div className={classes.contentWrapper}>
			<Paper className={classes.paper}>
				<AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
					<Toolbar><Typography variant="h6">Add a new Form</Typography></Toolbar>
				</AppBar>
				<Paper style={{"padding":"10px"}}>
		 			<SaveableForm {...props} fields={fields} />
				</Paper>
		 </Paper>
		 </div>
	 );
};

const fields=[
	"label",
	"header",
	"fields",
	"required_fields",
	"presubmit",
	"button_text",
	"default_source_code",
	"segments",
	"footer"
];

function EditForm(props){
	const {classes,values}=props;
	const [tabIndex, setTabIndex] = React.useState(0);
	return	<div className={classes.contentWrapper}>
	<Paper className={classes.paper}>
	<AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
		<Toolbar>
			<Typography variant="h6">{values.label}</Typography>
			<Tabs value={tabIndex} onChange={(e,t)=>setTabIndex(t)}>
				<Tab label="Settings" id="tab-0"/>
				<Tab label="Preview" id="tab-1"/>
			</Tabs>
		</Toolbar>
	</AppBar>
		<TabPanel value={tabIndex} index={0} classes={classes}><SaveableForm {...props} fields={fields} /></TabPanel>
		<TabPanel value={tabIndex} index={1} classes={classes}>
		{JSON.stringify(values)}
		<iframe title="form_preview"><html><body>
		{values.header}
		{values.footer}
		<button>Submit</button>
		</body></html></iframe>
		</TabPanel>

	</Paper>
	</div>;
}

export default function FormEdit(props){
	if (!props.id) return <NewForm {...props}/>;
	return <EditForm {...props}/>
}
