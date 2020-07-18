import React from 'react';

import Paper from '@material-ui/core/Paper';

export function TabPanel({index,value,classes,children}){
	return <Paper hidden={index!==value}>{children}</Paper>
}
