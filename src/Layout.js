import React,{useContext,useRef} from 'react';
import { Route, Switch } from "react-router-dom";
import Sidebar from "./components/Sidebar.js";

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

export default function Layout(props){
	const mainPanel = useRef(null);
    return <SchemaProvider>
			<CustomLayoutProvider>
				<SnackbarProvider>
      <div className="wrapper">
        <Sidebar
          {...props}
        />
        <div className="main-panel" ref={mainPanel}>
          <Header {...props} />
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
			</SchemaProvider>;
}
