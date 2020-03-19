import React from 'react';
import { forwardRef } from 'react';
import MaterialTable from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };


export default function AutoTable(props){
	const {title}=props;
	let [data,setData]=React.useState(props.data);

	const columns=props.columns || [];
		let editable=null;
		if (props.onRowAdd || props.onRowDelete || props.onRowUpdate){
			editable={
				onRowAdd: props.onRowAdd && (newData =>
					new Promise( (resolve, reject) => {
						props.onRowAdd(newData);
						//if (typeof o.then=='function'){ o.then(()=>{resolve();});}
						let d=JSON.parse(JSON.stringify(data));
						d.push(newData);
						setData(d);
						resolve();
					})),
				onRowUpdate: props.onRowUpdate && ((newData, oldData) =>
					new Promise((resolve, reject) => {
						props.onRowUpdate(newData,oldData);
						//if (typeof o.then=='function'){ o.then(()=>{resolve();});}
						let d=JSON.parse(JSON.stringify(data));
						const index = data.indexOf(oldData);
						d[index] = newData;
						setData(d);
						resolve();
					})),
				onRowDelete: props.onRowDelete && (oldData =>
					new Promise((resolve, reject) => {
						props.onRowDelete(oldData);
						//if (typeof o.then=='function'){ o.then(()=>{resolve();});}
						let d=JSON.parse(JSON.stringify(data));
						const index = data.indexOf(oldData);
						d.splice(index, 1);
						setData(d);
						resolve();
					}))
			}
		};
		let actions=[];

    return (
      <MaterialTable
				icons={tableIcons}
        title={title || false}
        columns={columns}
        data={data}
				options={{
      		search: !!props.search
    		}}
				onRowClick={props.onRowClick}
				editable={editable}
				actions={actions}
      />
    );
}
