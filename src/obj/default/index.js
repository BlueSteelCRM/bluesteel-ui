import React from 'react';

import {useParams} from 'react-router-dom';
import View from './View';
import Edit from './Edit';
import FullList from 'components/FullList';

function name(props){
	let label=[].concat([props.label,props.given_name,props.family_name,props.amount])

	return label.filter(Boolean).join(" ");
}


export default function (props){
	let {object,id,operation}=useParams();
	if (id){
		if (operation.toLowerCase()==="edit"){
			return <Edit object={object} id={id}/>;
		}else{
			return <View object={object} id={id}/>;
		}
	}
	return <FullList nameFunc={name} object={object}/>;
}
