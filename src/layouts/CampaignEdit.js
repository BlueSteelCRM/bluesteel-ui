import React from 'react';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TelegramIcon from '@material-ui/icons/Telegram';
import ListIcon from '@material-ui/icons/List';
import ArrowRight from '@material-ui/icons/ArrowRight';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import SaveableForm from '../components/SaveableForm';
import Alert from '@material-ui/lab/Alert';
import {useHistory} from 'react-router';
import Nestable from 'react-nestable';
import {useQuery} from 'urql';



function getType(item){
	return item.id.split("-")[0];
}
function MessageSetList(props){
	const {campaign_id}=props;
	const history=useHistory();
	let query=`query ($filter:MessageSetFilter){
			listResult: MessageSetList(filter:$filter){
				id
				label
				EmailBlastList{
					id
					label
					source_code
					status
				}
			}
	}`;
	const [result] = useQuery({query,variables:{filter:{campaign_id}}});
	const { data, fetching, error } = result;
	if (fetching) return null;
	if (error){
		return <Alert severity="error">{JSON.stringify(error)}</Alert>;
	}

	let items=data.listResult.map(set=>{
		return {
			id:"MessageSet-"+set.id,
			label:set.label,
			children:set.EmailBlastList.map(m=>{
				return {id:"EmailBlast-"+m.id,
				label:m.label,
				status:m.status,
				source_code:m.source_code
			};
		})
		}
	});



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
		<AppBar className={classes.searchBar} position="static" style={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"baseline",padding:"0px 20px"}}>
			<Typography variant="h6">{title}</Typography>
			<Toolbar>
				<Tabs value={tabIndex} onChange={(e,t)=>setTabIndex(t)}>
					<Tab label="Campaign Info" id="tab-contact"/>
					{id && <Tab label="Messages" id="tab-message"/>}
				</Tabs>
			</Toolbar>
			<div></div>
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
