import React from 'react';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import {useHistory} from 'react-router';
import Nestable from 'react-nestable';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TelegramIcon from '@material-ui/icons/Telegram';
import ListIcon from '@material-ui/icons/List';
import ArrowRight from '@material-ui/icons/ArrowRight';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import SaveableForm from '../components/SaveableForm';

function getType(item){
	return item.id.split("-")[0];
}
function MessageSetList(props){
	const history=useHistory();
	const {rows}=props;

	const handleClick=(item,history)=>{
		let type=getType(item);
		let id=item.id.split("-").pop();
		if (["Campaign","MessageSet"].indexOf(type)>=0) return false;
		history.push("/obj/"+type+"/"+id);
			//alert("Clicked "+JSON.stringify(item))
	}

	function renderCollapseIcon({isCollapsed}){
		return <span className="nestable-item-icon">{isCollapsed?<ArrowRight/>:<ArrowDropDown/>}</span>;
	}

	const renderItem = ({ item, collapseIcon, handler }) => {
	    let icon=null;
			let isMessage=true;
			switch (getType(item)){
				case "Campaign": icon=<AccountTreeIcon/>; isMessage=false;break;
				case "MessageSet": icon=<ListIcon/>; isMessage=false;break;
				default: icon=<TelegramIcon/>;
			}

			let onClick=null;
			if (isMessage){
				onClick=e=>{return handleClick(item,history)};
			}
			return <ListItem button={isMessage}
				onClick={onClick}>
	        <ListItemIcon>
					{!isMessage && collapseIcon}
					{icon}
	        </ListItemIcon>
	        <ListItemText primary={item.label} />

	      </ListItem>
	};

	let items=[
		{id:"MessageSet-456",label:"Message set",
				children:[{
					id:"EmailBlast-123",
					label:"Email Blast"
				}]
			}
		];

	function confirmChange(item,parent){
		//return true;
		return true;
		if (!parent) return false;
	 	if(parent.id.indexOf("campaign")!==0) return false;
		return true;
	}


	return <div className="campaign-list">
	<Nestable
		onChange={(items)=>{
			console.log(items);
		}}
		items={items}
		renderItem={renderItem}
		renderCollapseIcon={renderCollapseIcon}
		confirmChange={confirmChange}
		maxDepth={2}
	/>
	</div>
}


function TabPanel({index,value,classes,children}){
	return <Paper hidden={index!==value} style={{"padding":"10px"}}>{children}</Paper>
}

export default function CampaignEdit(props){
	let {id,values,classes}=props;
	const [tabIndex, setTabIndex] = React.useState(0);
	const title=id?"Edit "+values.label:"Create a new Campaign";

	return	<div className={classes.contentWrapper}>
	<Paper className={classes.paper}>
		<AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
			<Toolbar>
				<Typography variant="h6">{title}</Typography>
				<Tabs value={tabIndex} onChange={(e,t)=>setTabIndex(t)}>
					<Tab label="Campaign Info" id="tab-contact"/>
					{id && <Tab label="Messages" id="tab-message"/>}
				</Tabs>
			</Toolbar>
		</AppBar>
			<TabPanel value={tabIndex} index={0} classes={classes}>
				<SaveableForm {...props}/>
			</TabPanel>
			<TabPanel value={tabIndex} index={1} classes={classes}>
				{id && <MessageSetList object="MessageSet" filter={{campaign_id:parseInt(props.id)}} fields={['label']}/>}
			</TabPanel>
		</Paper>
	</div>;
}
