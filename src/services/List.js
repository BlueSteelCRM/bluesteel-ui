import {useContext} from 'react';
import {SchemaContext} from './SchemaContext';

import {useQuery} from 'urql';


export function useList(props){
	let { object } = props;
	let schema=useContext(SchemaContext);

	console.log("Listing ",object);

	/*
	if (typeof (layouts[object]?.List)==='function'){
		console.log("Returning custom object");
		return layouts[object].List(props);
	}
	*/

	let def=schema.objects[object];
	if (!def) throw new Error("Could not find object "+object+" in "+Object.keys(schema.objects));
	let {fields}=def;
	let q=fields.slice(0,20).map(d=>d.name);
	let query=`query {
			listResult: ${object}List{
				${q.join("\n")}
			}
	}`;
	let columns=props.columns;
	if (!columns) columns=q.map(field=>{
		if (field==='id' || field.slice(-3)==='_id' || field==='created_at') return false;
		return {title:field,field}
	}).filter(Boolean);
	const [result] = useQuery({query});

	const { data, fetching, error } = result;
	if (fetching) return {fetching};
	if (error) return {error}

	let rows=[];
	if (data && data.listResult){
		rows=data.listResult.map(row=>{
			for (let i in row){
				if (typeof row[i]=='object') row[i]=JSON.stringify(row[i]);
			}
			return Object.assign({},row);
		});
	}

	/*
	let detailPanel=CustomLayout?.detailPanel;
	let onRowClick=null;

	if (detailPanel){
		onRowClick=CustomLayout?.onRowClick || ((event, rowData, togglePanel) => togglePanel());
	}else{
		onRowClick=CustomLayout?.onRowClick || ((e,row)=>{history.push("/obj/"+object+"/"+row.id+"/edit")});
	}
	*/


	return {columns,rows}
};
