import React,{useContext} from 'react';
import {SchemaContext} from '../SchemaContext';
import {CustomLayoutContext} from '../CustomLayoutContext';
import SaveableForm from './SaveableForm';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import ObjectHeader from './ObjectHeader';

import { withStyles } from '@material-ui/core/styles';
import {commonStyles} from '../theme/Styles';

import {useQuery} from 'urql';

import {useParams} from 'react-router-dom';


function RetrieveData({object,variables,fields,children}){
	let query=`query($id:ID!){
			values:${object}(id:$id){
				${fields.map(d=>d.name).join("\n")}
			}
	}`;

	const [result] = useQuery({
    query,
		variables
  });
	if (result.fetching) return null;
	let values={};
	if (result.data && result.data.values) values=result.data.values;
	return children(values);
};

export default withStyles(commonStyles)(function({classes}){
	let { object,id } = useParams();
	let schema=useContext(SchemaContext);
	let layouts=useContext(CustomLayoutContext);
	let def=schema.objects[object];
	if (!object) return "Could not find object "+object;
	let {fields}=def;

	return <React.Fragment>
		<ObjectHeader object={object}/>
			<RetrieveData variables={{id}} object={object} fields={fields}>{(values)=>{
				if (layouts && layouts[object] && layouts[object].Edit){
					console.log("Using custom layout for ",object);
					return React.createElement(layouts[object].Edit,{object,id,fields,values,classes});
				}else{
					console.log("Not using custom layout for ",object,layouts[object]);
					let title="Create "+object;
					if (id){
						if (values.given_name && values.family_name){
							 	title="Edit "+values.given_name+" "+values.family_name;
						}else{
							title="Edit "+object;
						}
					}

					return <div className={classes.contentWrapper}>
						<Paper className={classes.paper}>
							<Card>
								<CardHeader title={title}/>
									<CardContent>
										<SaveableForm object={object} id={id} fields={fields} values={values}/>
									</CardContent>
							</Card>
						</Paper>
					</div>;
				}
			}}
			</RetrieveData>
		</React.Fragment>
});
