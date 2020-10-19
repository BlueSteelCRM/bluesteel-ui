
import PersonEdit from './PersonEdit.js';
import PersonList from './PersonList.js';
import PersonQueryEdit from './PersonQueryEdit.js';
import CampaignEdit from './CampaignEdit.js';
import CampaignList from './CampaignList.js';
import MessageSetEdit from './MessageSetEdit.js';

import EmailBlastEdit from './EmailBlastEdit.js';
import FormEdit from './FormEdit.js';

import FileImportEdit from './FileImportEdit.js';

export default {
	Person:{Edit:PersonEdit,List:PersonList},
	Form:{Edit:FormEdit},
	FileImport:{Edit:FileImportEdit},
	Campaign:{Edit:CampaignEdit,List:CampaignList},
	MessageSet:{Edit:MessageSetEdit},
	PersonQuery:{Edit:PersonQueryEdit},
	EmailBlast:{Edit:EmailBlastEdit}
};
