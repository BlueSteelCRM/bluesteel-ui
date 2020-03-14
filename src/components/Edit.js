import React from 'react';
import Paper from '@material-ui/core/Paper';

import {useQuery} from 'urql';
import {useParams} from 'react-router-dom';
import ObjectHeader from './ObjectHeader';

import { withStyles } from '@material-ui/core/styles';
import {commonStyles} from '../theme/Styles';

function Edit(props){
	let {classes}=props;
	let { object } = useParams()

  const [result] = useQuery({
    query: `query {
			  ${object}Metadata{
					fields{
						name,
						type
					}
			  }
		}`,
    requestPolicy: 'cache-only',
  });
  return <React.Fragment>
		<ObjectHeader object={object}/>
		<div className={classes.contentWrapper}>
			<Paper>
				{JSON.stringify(result)}
			</Paper>
		</div>
	</React.Fragment>
};

export default withStyles(commonStyles)(Edit);
