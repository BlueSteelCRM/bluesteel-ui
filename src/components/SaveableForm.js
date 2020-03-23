import React,{useState} from 'react';

import Alert from '@material-ui/lab/Alert';

import {useMutation} from 'urql';
import useNotifiers from '../util/Notifiers';

import AutoForm from './AutoForm';

export default function SaveableForm({object,fields:_fields, values}){
	const {notify} = useNotifiers();
	const [error,setError]=useState(null);
	let fields=_fields.map(f=>{
		if (typeof f=='string'){
			f={name:f};
		}
		if (f==='id'){
			f.hidden=true;
			return f;
		};
		if (f.name.slice(-3)==='_id'){
			return false;
		};
		return f;
	}).filter(Boolean);

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
				setError(result.error);
      }else{
				notify("Saved");
			}
    });
  }, [executeMutation,notify]);

	if (state.fetching) return null;

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


	return <React.Fragment>
				{error && <Alert severity="error">{JSON.stringify(error)}</Alert>}
				<AutoForm
					onSubmit={values=>{saveRecord(values);return false;}}
					fields={fields}
					values={values}
				/>
				</React.Fragment>
};
