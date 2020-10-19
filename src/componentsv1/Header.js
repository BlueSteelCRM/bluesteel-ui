import React from 'react';

import {Nav,Navbar,NavDropdown} from 'react-bootstrap';

export default function Header(props) {
  const { onSidebarToggle=()=>{} } = props;

  return (
		<Navbar bg="primary" expand="lg">
			<button onClick={e=>onSidebarToggle()} aria-controls="basic-navbar-nav" type="button" aria-label="Toggle navigation" class="navbar-toggler collapsed"><span class="navbar-toggler-icon"></span></button>
			<button
				type="button"
				className="navbar-toggler"
				onClick={e => onSidebarToggle()}
			>
			for
			</button>

		  <Navbar.Toggle aria-controls="basic-navbar-nav" />
		  <Navbar.Collapse id="basic-navbar-nav">
		    <Nav className="mr-auto">
		      <Nav.Link href="#home">Home</Nav.Link>
		      <Nav.Link href="#link">Link</Nav.Link>
		      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
		        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
		        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
		        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
		        <NavDropdown.Divider />
		        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
		      </NavDropdown>
		    </Nav>
		  </Navbar.Collapse>
		</Navbar>
  );
}
