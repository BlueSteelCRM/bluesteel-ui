import React from 'react';
import SaveableTable from '../components/SaveableTable';
import {useHistory} from 'react-router';

function DetailPanel({row}){
	const history = useHistory();
    return (
			<SaveableTable title="" object="MessageSet" filter={{campaign_id:parseInt(row.id)}} fields={['label']}
			onRowClick={(e,row)=>{history.push("/obj/MessageSet/"+row.id+"/edit");}}
			/>
    )
}

export default {
	columns:[
		{title:"Label",field:'label'}
	],
	detailPanel:DetailPanel
}
