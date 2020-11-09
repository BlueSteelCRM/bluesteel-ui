import React,{useContext} from 'react';
import {SchemaContext} from '../SchemaContext';
import AutoTable from './AutoTable';
import {useQuery,useMutation} from 'urql';
import useNotifiers from '../util/Notifiers';


const RetrieveData=({saveMutation,deleteMutation,query,variables,expandedFields,title,onRowClick})=>{
	const [result,reexecuteQuery] = useQuery({query,variables});
	const {notify,notifyErr} = useNotifiers();
	const [saveState, executeSaveMutation] = useMutation(saveMutation);
	const [deleteState, executeDeleteMutation] = useMutation(deleteMutation);

	const saveRecord = (newData,cb) => {
		//These are managed by the database
		delete newData.created_at;
		delete newData.updated_at;
		//If there was a filter, make sure at least the filter value is assigned
		if (variables && variables.filter){
			for (let i in variables.filter){
				if (!newData[i] && variables.filter[i] && typeof variables.filter[i]!='object'){
					newData[i]=variables.filter[i];
				}
			}
		}

    return executeSaveMutation({record:newData})
			.then(o=>{
					if (o.error) return notifyErr(o.error);
					reexecuteQuery({ requestPolicy: 'network-only' });
					if (typeof cb=='function') cb();
					notify();
		});
  };

	const deleteRecord = (oldData,cb) => {
		debugger;
    return executeDeleteMutation({id:oldData.id}).then(()=>notify("Deleted"),notifyErr).then(e=>{
			reexecuteQuery({ requestPolicy: 'network-only' });
			if (typeof cb=='function') cb();
		});
  };

	if (deleteState.fetching) return null;

	let columns=expandedFields.filter(f=>f.display).map(field=>{
		return {title:field.label || field.name,field:field.name}
	});

	const { data, fetching, error } = result;
	if (fetching) return null;
	if (error){
		return <div className="alert alert-danger">{JSON.stringify(error)}</div>;
	}

	let rows=[];
	if (data && data.listResult) rows=data.listResult;
	rows.forEach(r=>delete r.__typename);

  return <AutoTable
					title={title}
	        columns={columns}
	        data={rows}
					onRowAdd={(newData,cb)=>saveRecord(newData)}
					onRowUpdate={(newData,oldData)=>saveRecord(newData)}
					onRowDelete={(oldData,e)=>{
							debugger;
							deleteRecord(oldData)
					}}
					onRowClick={onRowClick}
			/>
};

export default function SaveableTable(props){
	let {object,fields,filter,onRowClick}=props;
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

	return <RetrieveData title={props.title} query={query} saveMutation={saveMutation} deleteMutation={deleteMutation}
		expandedFields={expandedFields} variables={{filter}}
		onRowClick={onRowClick}
		/>;
};
