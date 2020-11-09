import React,{useContext} from 'react';
import './App.css';
import Header from 'components/header';
import Aside from 'components/aside';
import Index from './layouts/index';

import {Route,Switch} from 'react-router-dom';
import {SchemaContext} from './services/SchemaContext';
import JSONPretty from 'react-json-pretty';
import Person from './obj/person/index.js';
import PersonView from './obj/person/View.js';
import Segment from './obj/segment/index.js';
import DefaultObject from './obj/default';


function TestSchemaDisplay(){
	let schema=useContext(SchemaContext);
	return <JSONPretty id="schema-json" data={schema}/>
}

function App() {
  return (
		<div className="app">
			<Header/>
			<Aside/>
			<main className="app-main">
				<div className="wrapper">
					<Switch>
						<Route path='/schema'><TestSchemaDisplay/></Route>
						<Route path={['/obj/Person/:id','/obj/Person']}><Person/></Route>
						<Route path='/obj/Segment'><Segment/></Route>
						<Route path='/obj/:object/:id/:operation'><DefaultObject/></Route>
						<Route path='/obj/:object/:id'><DefaultObject/></Route>
						<Route path='/obj/:object'><DefaultObject/></Route>

						<Route path='/'>
										<Index/>
						</Route>
					</Switch>
				</div>
			</main>
		</div>
  );
}

export default App;
