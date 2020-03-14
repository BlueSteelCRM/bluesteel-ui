import React,{useContext} from 'react';
import {SchemaContext} from '../SchemaContext';

import Paper from '@material-ui/core/Paper';

import {useQuery} from 'urql';
import {useParams} from 'react-router-dom';
import ObjectHeader from './ObjectHeader';

import { withStyles } from '@material-ui/core/styles';
import {commonStyles} from '../theme/Styles';

const Query=withStyles(commonStyles)(({object,query,classes})=>{
	const [result] = useQuery({
    query,
    requestPolicy: 'cache-only',
  });
  return <React.Fragment>
		<ObjectHeader object={object}/>
		<div className={classes.contentWrapper}>
		<Paper className={classes.paper}>
			<div className={classes.contentWrapper}>
					{JSON.stringify(result)}
			</div>
		</Paper>
		</div>
	</React.Fragment>
});

export default function List(props){
	let { object } = useParams();
	let schema=useContext(SchemaContext);
	let def=schema.objects[object];
	if (!object) return "Could not find object "+object;
	let {fields}=def;
	let q=fields.slice(0,4).map(d=>d.name);
	let query=`query {
			${object}List{
				${q.join("\n")}
			}
	}`;
	return <Query query={query} object={object}/>;
}
