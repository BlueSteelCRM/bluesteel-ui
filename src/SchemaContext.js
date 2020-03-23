import React, { useEffect,useState } from 'react';
import { getIntrospectionQuery } from 'graphql';
const endpoint=process.env.REACT_APP_DATA_LAYER;
const QueryOptions=require('./QueryOptions');

const SchemaContext = React.createContext();

function SchemaProvider(props) {
	const [schema, setSchema] = useState({});
	const [schemaError, setSchemaError] = useState(null);

  useEffect(() => {
		console.log("Fetching schema");
		fetch(endpoint, {
		  method: 'POST',
		  headers: { 'Content-Type': 'application/json' },
		  body: JSON.stringify({
		    variables: {},
		    query: getIntrospectionQuery({ descriptions: false }),
		  }),
		})
			.then(result => result.json())
		  .then((r)=>{
				let {data}=r;
				let s={objects:{}}
				data.__schema.types
					.filter(t=>{
						let include=t.kind==='OBJECT' &&
							['Query','Mutation','Subscription','__Schema','__Type','__Field','__InputValue','__EnumValue','__Directive','ListMetadata']
							.indexOf(t.name)<0;
						//if (!include) console.log("Ignoring ",t);
						return include;
					})
					.forEach(t=>{
						let fields=[];
						let objects=[];
						t.fields.forEach(t=>{
							if (t.type && (t.type.kind==='OBJECT' || t.type.kind==='LIST')) objects.push(t);
							else fields.push(t);
						});
						t.fields=fields;
						t.objects=objects;

						s.objects[t.name]=t;
					});
				if (Object.keys(s.objects).length===0){
					return setSchemaError("No valid objects found in the schema");
				}

				// Query fields and options
				s.queryOptions=QueryOptions;

				setSchema(s);
			});
  },[]); //Keep the array, that means this should be called only once

	if (schemaError) return schemaError;
	if (!schema.objects) return null;

 return (
    <SchemaContext.Provider value={schema}>
      {props.children}
    </SchemaContext.Provider>
  );
}
export { SchemaContext, SchemaProvider };
