import React from 'react';

import FullList from 'components/FullList';


function name(props){
	return props.given_name+" "+props.family_name;
}


export default function (props){
	return <FullList nameFunc={name} object="Person"/>;
}
