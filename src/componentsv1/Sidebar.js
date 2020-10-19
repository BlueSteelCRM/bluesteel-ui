import React from 'react';

import { People,Person,CardHeading, FileEarmarkArrowUp,ClipboardData,ReplyAll,Search,FileEarmarkRuled,CashStack} from 'react-bootstrap-icons';
import { NavLink } from "react-router-dom";
import { Accordion,ListGroup} from "react-bootstrap";


const categories = [
  {
    id: 'People',
    items: [
      { id: 'People', icon: <Person />, active: true,link:"/obj/Person" },
			{ id: 'Segments', icon: <People />, active: true,link:"/obj/Segment" },
			{ id: 'Queries', icon: <Search />, active: true,link:"/obj/PersonQuery" },
			{ id: 'Imports', icon: <FileEarmarkArrowUp />, active: true,link:"/obj/FileImport" },
    ],
  },
  {
    id: 'Messaging',
    items: [
      { id: 'Campaigns', icon: <ClipboardData />,link:"/obj/Campaign" },
			{ id: 'Emails', icon: <ReplyAll />,link:"/obj/EmailBlast" },
			{ id: 'Email Templates', icon: <CardHeading />,link:"/obj/EmailTemplate" },
			{ id: 'Forms', icon: <FileEarmarkRuled />,link:"/obj/Form" }
    ],
  },
	{
    id: 'Transactions',
    items: [
      { id: 'Donations', icon: <CashStack/>,link:"/obj/Transaction" }
    ],
  }
];

export default function Sidebar(props){

	return <div
		className="sidebar"
		data-color={props.bgColor}
		data-active-color={props.activeColor}
	>
		<div className="logo">
		<a
			href="/"
			className="simple-text logo-normal"
		>
			<img src="/images/logos/wide_logo_white.png" alt="logo" className="logo"/>
			</a>
		</div>
		<div className="sidebar-wrapper" >
		<Accordion defaultActiveKey={1}>
		  <ListGroup>
				{categories.map(({ id, items },i) => {
          return <React.Fragment key={id}>
						<Accordion.Toggle as={ListGroup.Item} variant="link" eventKey={i+1}>
			        {id}
			      </Accordion.Toggle>
						<Accordion.Collapse eventKey={i+1}>
						<React.Fragment>{items.map(({ id: childId, icon, link },j)=><li key={j}><NavLink to={link}>{icon}{childId}</NavLink></li>)}</React.Fragment>
						</Accordion.Collapse>
					</React.Fragment>;
			})}
		  </ListGroup>
		</Accordion>
		</div>
	</div>
}
