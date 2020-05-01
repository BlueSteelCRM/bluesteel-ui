import React from 'react';
import clsx from 'clsx';
import {sidebarStyles} from '../theme/Styles.js';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';

import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import {NavLink} from 'react-router-dom';
import {useLocation } from 'react-router-dom'
import DashboardIcon from '@material-ui/icons/Dashboard';
import TelegramIcon from '@material-ui/icons/Telegram';
import PublishIcon from '@material-ui/icons/Publish';
//import EmailIcon from '@material-ui/icons/Email';
import AccountTreeIcon from '@material-ui/icons/AccountTree';

/*
import DnsRoundedIcon from '@material-ui/icons/DnsRounded';
import PermMediaOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActual';
import PublicIcon from '@material-ui/icons/Public';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import TimerIcon from '@material-ui/icons/Timer';
import PhonelinkSetupIcon from '@material-ui/icons/PhonelinkSetup';
*/


const categories = [
  {
    id: 'People',
    children: [
      { id: 'People', icon: <PersonIcon />, active: true,link:"/obj/Person" },
			{ id: 'Segments', icon: <PeopleIcon />, active: true,link:"/obj/Segment" },
			{ id: 'Queries', icon: <PeopleIcon />, active: true,link:"/obj/PersonQuery" },
			{ id: 'Imports', icon: <PublishIcon />, active: true,link:"/obj/FileImport" },
    ],
  },
  {
    id: 'Messaging',
    children: [
      { id: 'Campaigns', icon: <AccountTreeIcon />,link:"/obj/Campaign" },
			{ id: 'Emails', icon: <TelegramIcon />,link:"/obj/EmailBlast" },
			{ id: 'Email Templates', icon: <DashboardIcon />,link:"/obj/EmailTemplate" }
    ],
  },
	{
    id: 'Transactions',
    children: [
      { id: 'Donations', icon: <AttachMoneyIcon />,link:"/obj/Transaction" }
    ],
  }
];

export default function Sidebar(props) {
	const classes =sidebarStyles();
	let location = useLocation();
	const {...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
				<img src="/images/blue-steel-logo-horizontal.png" alt="logo" height="80px" className="logo"/>
        <ListItem className={clsx(classes.item, classes.itemCategory)}
				component={NavLink} to="/"
				>
          <ListItemIcon className={classes.itemIcon}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText
            classes={{
              primary: classes.itemPrimary,
            }}
          >
            Home
          </ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <React.Fragment key={id}>
            <ListItem className={classes.categoryHeader}>
              <ListItemText
                classes={{
                  primary: classes.categoryHeaderPrimary,
                }}
              >
                {id}
              </ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, link }) => {
							let active=location.pathname===link;

							return (
              <ListItem
                key={childId}
                className={clsx(classes.item, active && classes.itemActiveItem)}
								 component={link && NavLink} to={link}
              >
                <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                >
                  {childId}
                </ListItemText>
              </ListItem>
            )})
					}
            <Divider className={classes.divider} />
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}
