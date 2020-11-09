import React from 'react';
import {useTable} from 'react-table';

export default function AutoTable(props){
	let {title,columns,data}=props;
	if (!columns){columns=Object.keys(data[0]||{}).map(k=>({title:k,field:k}));}

	const c=React.useMemo(()=>columns.map(c=>({Header:c.title,accessor:c.field})),[columns]);
	const d=React.useMemo(()=>data,[data]);

	return <div className="auto-table">
		{title && <h3>{title}</h3>}
		<Table {...Object.assign({},props,{columns:c,data:d})}/>
		</div>;
}


function Table(props){
	const {columns,data}=props;
	const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    });

		let onRowClick=props.onRowClick || (()=>{});

		return <table className="table" {...getTableProps()}>
	      <thead>
	        {headerGroups.map(headerGroup => (
	          <tr {...headerGroup.getHeaderGroupProps()}>
	            {headerGroup.headers.map(column => (
	              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
	            ))}
	          </tr>
	        ))}
	      </thead>
	      <tbody {...getTableBodyProps()}>
	        {rows.map((row, i) => {
	          prepareRow(row)
	          return (
	            <tr {...row.getRowProps()} onClick={e=>onRowClick(e,row.original)}>
	              {row.cells.map(cell => {
	                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
	              })}
	            </tr>
	          )
	        })}
	      </tbody>
	    </table>;
}
