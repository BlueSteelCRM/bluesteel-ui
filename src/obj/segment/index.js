import React from 'react';

import FullList from 'components/FullList';


function name(props){
	return props.label || "(No label)";
}

export default function (props){
	return <FullList nameFunc={name} object="Segment"/>;
}
