import React from 'react';

import {NavLink} from 'react-router-dom';
import pluralize from 'pluralize';

function ObjectLinks(props){
	let {object}=props;
	let plural=pluralize(object);
	return <div className="object-links">
		<NavLink to={`/obj/${object}/edit`}>Add a new {object}</NavLink>
		<NavLink to={`/obj/${object}`}>List {plural}</NavLink>
	</div>;
}

function ObjectWrapper(props){
	return <div class="edit-object"><ObjectLinks {...props}/>{props.children}</div>;
}

export default ObjectWrapper;
