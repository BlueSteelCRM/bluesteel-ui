import React from 'react';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
//import SaveableForm from '../components/SaveableForm';
import useNotifiers from '../util/Notifiers';

import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import SaveableForm from '../components/SaveableForm';


function TabPanel({index,value,classes,children}){
	return <Paper hidden={index!==value} style={{"padding":"10px"}}>{children}</Paper>
}




function NewFile(props){
	const {classes}=props;
	const {notify} = useNotifiers();
	let url=process.env.REACT_APP_DATA_LAYER.replace("/graphql","/upload");

  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => { return { url } }

  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files, allFiles) => {
    notify("Uploaded files:",files.map(f => f.meta));
    allFiles.forEach(f => f.remove())
  }

	return (
		<div className={classes.contentWrapper}>
			<Paper className={classes.paper}>
				<AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
					<Toolbar><Typography variant="h6">Import a file</Typography></Toolbar>
				</AppBar>
				<Paper style={{"padding":"10px"}}>
				<Dropzone
					getUploadParams={getUploadParams}
					onChangeStatus={handleChangeStatus}
					onSubmit={handleSubmit}
					accept=".csv,.txt"
				/>
				</Paper>
		 </Paper>
		 </div>
	 );
};

export default function Edit(props){
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
			<TabPanel value={tabIndex} index={0} classes={classes}>
				<SaveableForm {...props}/>
			</TabPanel>
			<TabPanel value={tabIndex} index={1} classes={classes}>TODO</TabPanel>

		</Paper>
	</div>;
}
