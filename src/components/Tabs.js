import React from 'react';

export function TabPanel({index,value,classes,children}){
	return <div hidden={index!==value}>{children}</div>
}
