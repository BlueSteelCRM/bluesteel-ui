import React,{useContext} from 'react';
import {SchemaContext} from '../SchemaContext';
import {CustomLayoutContext} from '../CustomLayoutContext';
import SaveableForm from './SaveableForm';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import ObjectWrapper from './ObjectWrapper';

import {commonStyles} from '../theme/Styles';
import {RetrieveData} from './GraphQL.js';

import {useParams} from 'react-router-dom';

function Data(props){
	if (props.variables.id===undefined) return props.children({});
	return <RetrieveData {...props}/>;
}

export default function({isNew}){
	let { object,id } = useParams();
	const classes=commonStyles();
	let schema=useContext(SchemaContext);
	let layouts=useContext(CustomLayoutContext);
	let def=schema.objects[object];
	if (!object) return "Could not find object "+object;
	let {fields}=def;

	if(isNew) id = undefined;

	//ids should be integers
	if (id && parseInt(id)!==Number(id)) return "Invalid id:"+id;

	return <Box display="flex">
			<ObjectWrapper object={object}>
				<Data variables={{id}} object={object} fields={fields}>{(values)=>{
					if (layouts && layouts[object] && layouts[object].Edit){
						console.log("Using custom layout for ",object);
						return React.createElement(layouts[object].Edit,{object,id,fields,values,classes});
					}else{
						console.log("Not using custom layout for ",object,layouts[object]);
						let title="Create "+object;
						if (id){
							if (values.given_name && values.family_name){
								 	title="Edit "+values.given_name+" "+values.family_name;
							}else if (values.label){
								title="Edit "+values.label;
							}else{
								title="Edit "+object;
							}
						}

						return <div className={classes.contentWrapper}>
							<Paper className={classes.paper}>
								<AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
									<Toolbar><Typography variant="h6">{title}</Typography></Toolbar>
								</AppBar>
								<Box p={3}>
									<SaveableForm object={object} id={id} fields={fields} values={values}/>
								</Box>
							</Paper>
						</div>;
					}
				}}
				</Data>
			</ObjectWrapper>
		</Box>
};
