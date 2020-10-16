import React,{useContext} from 'react';
import { Route, Switch } from "react-router-dom";
import {SidebarBoot} from "./components/Sidebar.js";

import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Icons from './icons';
import List from './components/List';
import Edit from './components/Edit';
import Home from './layouts/Home';

import {SchemaProvider,SchemaContext} from './SchemaContext';
import {CustomLayoutProvider} from './CustomLayoutContext';
import { SnackbarProvider } from 'notistack';

import JSONPretty from 'react-json-pretty';

function SchemaDisplay(){
	let schema=useContext(SchemaContext);
	return <JSONPretty id="schema-json" data={schema}/>
}



class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "black",
      activeColor: "info",
    };
    this.mainPanel = React.createRef();
  }

  handleActiveClick = (color) => {
    this.setState({ activeColor: color });
  };
  handleBgClick = (color) => {
    this.setState({ backgroundColor: color });
  };
  render() {
    return (
			<SchemaProvider>
			<CustomLayoutProvider>
				<SnackbarProvider>
      <div className="wrapper">
        <SidebarBoot
          {...this.props}
          bgColor={this.state.backgroundColor}
          activeColor={this.state.activeColor}
        />
        <div className="main-panel" ref={this.mainPanel}>
          <Header {...this.props} />
					<div class="content">
							<Switch>
								<Route path='/icons'><Icons/></Route>
								<Route path='/schema'><SchemaDisplay/></Route>
								<Route path='/obj/:object/edit'><Edit isNew/></Route>
								<Route path='/obj/:object/:id'><Edit/></Route>
								<Route path='/obj/:object'><List/></Route>
								<Route path='/'><Home/></Route>
							</Switch>
					</div>
          <Footer fluid />
        </div>
      </div>
				</SnackbarProvider>
				</CustomLayoutProvider>
			</SchemaProvider>


    );
  }
}

export default Dashboard;
