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


export default function EditableTable(props){
	const {title="List"}=props;
	let [data,setData]=React.useState([
		{ name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
		{ name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
		{ name: 'B', surname: 'Baran', birthYear: 2017, birthCity: 34 },
		{ name: 'C', surname: 'Baran', birthYear: 2017, birthCity: 34 },
		{ name: 'D', surname: 'Baran', birthYear: 2017, birthCity: 34 },
		{ name: 'E', surname: 'Baran', birthYear: 2017, birthCity: 34 },
		{ name: 'f', surname: 'Baran', birthYear: 2017, birthCity: 34 },
	]);

	const opts={
		columns: [
			{ title: 'Name', field: 'name' },
			{ title: 'Surname', field: 'surname', initialEditValue: 'initial edit value' },
			{ title: 'Birth Year', field: 'birthYear', type: 'numeric' },
			{
				title: 'Birth Place',
				field: 'birthCity',
				lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
			},
		]
	}

    return (
      <MaterialTable
				icons={tableIcons}
        title={title}
        columns={opts.columns}
        data={data}
				options={{
      		search: !!props.search
    		}}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = opts.data;
                  data.push(newData);
                  setData(data, () => resolve());
                }
                resolve()
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  const data = opts.data;
                  const index = data.indexOf(oldData);
                  data[index] = newData;
                  setData(data, () => resolve());
                }
                resolve()
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                {
                  let data = opts.data;
                  const index = data.indexOf(oldData);
                  data.splice(index, 1);
                  setData(data, () => resolve());
                }
                resolve()
              }, 1000)
            }),
        }}
      />
    )
}
