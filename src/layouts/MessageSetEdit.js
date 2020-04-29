import React from 'react';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import SaveableTable from '../components/SaveableTable';
import {useHistory} from 'react-router';



export default function Edit(props){
	let {id,values,classes}=props;
	const history = useHistory();
    return (
			<div className={classes.contentWrapper}>
				<Paper className={classes.paper}>
						<AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
							<Toolbar><Typography variant="h6">{values.label}</Typography></Toolbar>
						</AppBar>
						<Box p={3}>
					<SaveableTable title="" object="EmailBlast" filter={{message_set_id:parseInt(id)}} fields={['label']}
					onRowClick={(e,row)=>{history.push("/obj/EmailBlast/"+row.id+"/edit");}}
					/>
					</Box>
				</Paper>
			</div>
    )
}
