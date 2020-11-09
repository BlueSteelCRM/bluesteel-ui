import React from 'react';
//import SaveableTable from '../../components/SaveableTable';
import SaveableForm from '../../components/SaveableForm';

function NewObject(props){
	return (
		<div className="page-inner">
				<header className="page-title-bar">
					<div className="d-flex justify-content-between"><h6>Add a new Person</h6></div>
				</header>
				<div className="page page-section">
		 			<SaveableForm {...props}/>
				</div>
		 </div>
	 );
};

export default function Edit(props){
	if (!props.id) return <NewObject {...props}/>;

	return <div className="page-inner">
				<header className="page-title-bar">
					<div className="d-flex justify-content-between"><h6>Edit</h6></div>
				</header>
				<div className="page page-section">
					<SaveableForm {...props}/>
				</div>
		 </div>;
}
