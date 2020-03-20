import React from 'react';
import PersonEdit from './layouts/PersonEdit.js';
import EmailBlastEdit from './layouts/EmailBlastEdit.js';
import PersonQueryEdit from './layouts/PersonQueryEdit.js';

const CustomLayoutContext = React.createContext();

function CustomLayoutProvider(props) {

	let layouts={
		Person:{Edit:PersonEdit},
		PersonQuery:{Edit:PersonQueryEdit},
		EmailBlast:{Edit:EmailBlastEdit}
	};

 return (
    <CustomLayoutContext.Provider value={layouts}>
      {props.children}
    </CustomLayoutContext.Provider>
  );
}
export { CustomLayoutContext, CustomLayoutProvider };
