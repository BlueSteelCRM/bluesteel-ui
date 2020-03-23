import React from 'react';
import Paper from '@material-ui/core/Paper';
import SaveableForm from '../components/SaveableForm';
import AppBar from '@material-ui/core/AppBar';
//import Grid from '@material-ui/core/Grid';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import EmailEditor from 'react-email-editor'

function TabPanel({index,value,classes,children}){
	return <Paper hidden={index!==value}>{children}</Paper>
}

export default function Edit(props){
	let {classes}=props;
	const [tabIndex, setTabIndex] = React.useState(0);
	let editor=null;

	function exportHtml(){
    editor.exportHtml(data => {
      const { design, html } = data
			if (design){}
      console.log('exportHtml', html)
    })
  }
	if (exportHtml){}
	return	<div className={classes.contentWrapper}>
		<Paper className={classes.paper}>
			<AppBar position="static">
			<Tabs value={tabIndex} onChange={(e,t)=>setTabIndex(t)}>
				<Tab label="Overview" id="tab-overview"/>
				<Tab label="HTML" id="tab-html"/>
				<Tab label="Text" id="tab-text"/>
			</Tabs>
			</AppBar>
			<TabPanel value={tabIndex} index={0} classes={classes}>
					<Paper style={{padding:"10px"}}><SaveableForm {...Object.assign({},props,{fields:["subject","from_name","from_email"]})}/></Paper>
			</TabPanel>
			<TabPanel value={tabIndex} index={1} classes={classes}>
				<EmailEditor ref={_editor => editor = _editor}/>
			</TabPanel>
			<TabPanel value={tabIndex} index={2} classes={classes}>
					<Paper style={{padding:"10px"}}><SaveableForm {...Object.assign({},props,{fields:["text_body"]})}/></Paper>
			</TabPanel>
			</Paper>
		</div>;
}
