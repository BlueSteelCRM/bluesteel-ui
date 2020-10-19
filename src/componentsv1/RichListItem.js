import React from 'react';
import {ListGroup} from 'react-bootstrap';


export function RichListItem({primary,secondary}){
	return <ListGroup.Item>
	<h5>{primary}</h5>
	{secondary && <h6>{secondary}</h6>}
	</ListGroup.Item>
};
