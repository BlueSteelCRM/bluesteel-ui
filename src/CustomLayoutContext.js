import React from 'react';
import PersonEdit from './layouts/PersonEdit.js';
import CampaignEdit from './layouts/CampaignEdit.js';
import CampaignList from './layouts/CampaignList.js';
import MessageSetEdit from './layouts/MessageSetEdit.js';
import PersonList from './layouts/PersonList.js';
import EmailBlastEdit from './layouts/EmailBlastEdit.js';
import PersonQueryEdit from './layouts/PersonQueryEdit.js';

const CustomLayoutContext = React.createContext();

function CustomLayoutProvider(props) {

	let layouts={
		Person:{Edit:PersonEdit,List:PersonList},
		Campaign:{Edit:CampaignEdit,List:CampaignList},
		MessageSet:{Edit:MessageSetEdit},
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
