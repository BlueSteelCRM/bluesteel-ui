import React,{useState} from 'react';
import {useHistory} from 'react-router';

import {Alert} from 'react-bootstrap';

import {useMutation} from 'urql';
import useNotifiers from '../util/Notifiers';


import AutoForm from './AutoForm';

export default function SaveableForm({object,fields:_fields, values}){
	const {notify} = useNotifiers();
	const [error,setError]=useState(null);
	const history = useHistory();
	let fields=_fields.map(f=>{
		if (typeof f=='string'){
			f={name:f};
		}
		if(f.name === 'id') f.hidden = true;
		return f;
	}).filter(({name}) => {
		if(name.slice(-3) === '_id') return false;
		if(name === 'created_at' || name === 'updated_at') return false;
		return true;
	});

	let SAVE_MUTATION=`mutation($record:${object}Save!){
			save_result:${object}Save(record:$record){
				id
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
				setError(null);
				const {data}=result;
				if(data.save_result.id && !values.id){
						history.push(`/obj/${object}/${data.save_result.id}/edit`);
				}else{
					Object.assign(values,data.save_result);
				}
				notify("Saved");
			}
    });
  }, [executeMutation,notify,history,object,values]);

	//if (state.fetching) return null; //this will cause the UI to 'flash'

	return <React.Fragment>
				{error && <Alert variant="danger">{JSON.stringify(error)}</Alert>}
				<AutoForm
					onSubmit={values=>{saveRecord(values);return false;}}
					fields={fields}
					values={values}
				/>
				</React.Fragment>
};
