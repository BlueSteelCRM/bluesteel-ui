import React from 'react';
import {useParams} from 'react-router-dom';
import FullList from 'components/FullList';

function name(props){
	return props.label || props.name || "(no name)";
}


export default function(props){
	const {object}=useParams();

	return <FullList nameFunc={name} object={object}/>;
}
