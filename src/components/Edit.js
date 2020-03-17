import React,{useState,useContext} from 'react';
import {SchemaContext} from '../SchemaContext';

import Paper from '@material-ui/core/Paper';
import Alert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

import {useQuery,useMutation} from 'urql';
import {useParams} from 'react-router-dom';
import ObjectHeader from './ObjectHeader';

import { withStyles } from '@material-ui/core/styles';
import {commonStyles} from '../theme/Styles';

import AutoForm from './AutoForm';

const DisplayForm=withStyles(commonStyles)(({object,fields, values,classes})=>{
	const [error,setError]=useState(null);
	let SAVE_MUTATION=`mutation($record:${object}Save!){
			save_result:${object}Save(record:$record){
				${fields.map(d=>d.name).join("\n")}
			}
	}`;

	const [state, executeMutation] = useMutation(SAVE_MUTATION);

  const saveRecord = React.useCallback((newVals) => {
		//These are managed by the database
		delete newVals.created_at;
		delete newVals.updated_at;
    executeMutation({record:newVals}).then(result => {
      if (result.error) {
				console.error("Total result=",result);
				setError(result.error);
      }
    });
  }, [executeMutation]);

	if (state.fetching) return "Saving data";


	/*
	const fields = [
		{ name: 'given_name'},
	 	{ name:"email",
			type:"email",
			required: 'Required',
			pattern: {
				value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
				message: "invalid email address"
			}
		}];
	*/
	let title="Edit "+object;
	if (values.given_name && values.family_name) title="Edit "+values.given_name+" "+values.family_name;


	return  <React.Fragment>
		<ObjectHeader object={object}/>
		<div className={classes.contentWrapper}>
		<Paper className={classes.paper}>
			<Card>
			<CardHeader title={title}/>
			<CardContent>
				{error && <Alert severity="error">{JSON.stringify(error)}</Alert>}
				<AutoForm
					onSubmit={values=>{console.log("Saving ...",values);saveRecord(values);return false;}}
					fields={fields}
					values={values}
				/>
			</CardContent>
			</Card>
		</Paper>
		</div>
	</React.Fragment>
});

function RetrieveData({object,variables,fields}){
	let query=`query($id:ID!){
			values:${object}(id:$id){
				${fields.map(d=>d.name).join("\n")}
			}
	}`;

	const [result] = useQuery({
    query,
		variables
  });
	if (result.fetching) return "Loading...";
	let values={};
	if (result.data && result.data.values) values=result.data.values;
  return <DisplayForm object={object} fields={fields} values={values}/>
};


export default function List(props){
	let { object,id } = useParams();
	let schema=useContext(SchemaContext);
	let def=schema.objects[object];
	if (!object) return "Could not find object "+object;
	let {fields}=def;

	if (id){
		return <RetrieveData variables={{id}} object={object} fields={fields}/>
	}

	return <DisplayForm object={object} fields={fields} />;
}
