import React,{useContext} from 'react';
import {SchemaContext} from '../SchemaContext';
import AutoTable from './AutoTable';
import Alert from '@material-ui/lab/Alert';
import {useQuery,useMutation} from 'urql';
import useNotifiers from '../util/Notifiers';


const RetrieveData=({saveMutation,deleteMutation,query,variables,expandedFields,title})=>{
	const [result] = useQuery({query,variables});
	const {notify,notifyErr} = useNotifiers();
	const [saveState, executeSaveMutation] = useMutation(saveMutation);
	const [deleteState, executeDeleteMutation] = useMutation(deleteMutation);

	const saveRecord = (newData) => {
		//These are managed by the database
		delete newData.created_at;
		delete newData.updated_at;
		newData.person_id=1;
    return executeSaveMutation({record:newData}).then(notify,notifyErr)
  };

	const deleteRecord = (oldData) => {
    return executeDeleteMutation({id:oldData.id}).then(()=>notify("Deleted"),notifyErr)
  };

	if (saveState.fetching || deleteState.fetching) return null;

	let columns=expandedFields.filter(f=>f.display).map(field=>{
		return {title:field.label || field.name,field:field.name}
	});

	const { data, fetching, error } = result;
	if (fetching) return null;
	if (error){
		return <Alert severity="error">{JSON.stringify(error)}</Alert>;
	}


	let rows=[];
	if (data && data.listResult) rows=data.listResult;

  return <AutoTable
					title={title}
	        columns={columns}
	        data={JSON.parse(JSON.stringify(rows))}
					onRowAdd={newData=>saveRecord(newData)}
					onRowUpdate={(newData,oldData)=>saveRecord(newData)}
					onRowDelete={(oldData)=>deleteRecord(oldData)}
			/>
};

export default function QueryTable(props){
	let {object,fields,filter}=props;
	let schema=useContext(SchemaContext);

	let def=schema.objects[object];
	if (!def) return "Could not find object "+object+" in "+Object.keys(schema.objects);

	let expandedFields=def.fields.map(fieldDef=>{
		let f=Object.assign({},fieldDef);
		if (fieldDef.name==='id') f.query=true;
		let overrideOpts=fields && fields.find(field=>field===fieldDef.name || field.name===fieldDef.name);

		if (typeof overrideOpts=='object'){
			Object.assign(f,overrideOpts);
			f.query=true;
			f.display=true;
		}else if (typeof overrideOpts=='string'){
			f.query=true;
			f.display=true;
		}else{
			//not included
			f.query=true;
			f.display=false;
		}
		return f;
	});

	if (expandedFields.filter(d=>d.display).length===0){
		return <Alert severity="error">No matching fields found in {expandedFields.map(d=>d.name).join()}</Alert>;
	}

	let query=`query ($filter:${object}Filter){
			listResult: ${object}List(filter:$filter){
				${expandedFields.filter(d=>d.query).map(d=>d.name).join("\n\t")}
			}
	}`;

	let saveMutation=`mutation($record:${object}Save!){
			save_result:${object}Save(record:$record){
				${expandedFields.filter(d=>d.query).map(d=>d.name).join("\n\t")}
			}
	}`;
	let deleteMutation=`mutation($id:ID!){
			delete_result:${object}Delete(id:$id){
				${expandedFields.filter(d=>d.query).map(d=>d.name).join("\n\t")}
			}
	}`;

	return <RetrieveData title={props.title} query={query} saveMutation={saveMutation} deleteMutation={deleteMutation} expandedFields={expandedFields} variables={{filter}}/>;
};
