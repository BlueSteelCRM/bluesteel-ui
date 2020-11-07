import React from 'react';

import {useParams} from 'react-router-dom';
import View from './View';
import FullList from 'components/FullList';


function name(props){
	return props.given_name+" "+props.family_name;
}


export default function (props){
	let {id}=useParams();
	if (id) return <View object="Person" id={id}/>;
	return <FullList nameFunc={name} object="Person"/>;
}
