import React from 'react';
import PersonEdit from './layouts/PersonEdit.js';

const CustomLayoutContext = React.createContext();

function CustomLayoutProvider(props) {

	let layouts={
		Person:{
			Edit:PersonEdit
		}
	};

 return (
    <CustomLayoutContext.Provider value={layouts}>
      {props.children}
    </CustomLayoutContext.Provider>
  );
}
export { CustomLayoutContext, CustomLayoutProvider };
