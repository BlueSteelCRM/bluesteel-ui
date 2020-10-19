import React,{useContext} from 'react';
import {SchemaContext} from '../SchemaContext';
import {CustomLayoutContext} from '../CustomLayoutContext';
import SaveableForm from './SaveableForm';

import ObjectWrapper from './ObjectWrapper';

import {RetrieveData} from './GraphQL.js';

import {useParams} from 'react-router-dom';

function Data(props){
	if (props.variables.id===undefined) return props.children({});
	return <RetrieveData {...props}/>;
}

export default function({isNew}){
	let { object,id } = useParams();
	let schema=useContext(SchemaContext);
	let layouts=useContext(CustomLayoutContext);
	let def=schema.objects[object];
	if (!object) return "Could not find object "+object;
	let {fields}=def;

	if(isNew) id = undefined;

	//ids should be integers
	if (id && parseInt(id)!==Number(id)) return "Invalid id:"+id;

	return <div display="flex">
			<ObjectWrapper object={object}>
				<Data variables={{id}} object={object} fields={fields}>{(values)=>{
					if (layouts && layouts[object] && layouts[object].Edit){
						console.log("Using custom layout for ",object);
						return React.createElement(layouts[object].Edit,{object,id,fields,values});
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

						return <div className={"edit-object"}>
							<h2>{title}</h2>
									<SaveableForm object={object} id={id} fields={fields} values={values}/>
						</div>;
					}
				}}
				</Data>
			</ObjectWrapper>
		</div>
};
