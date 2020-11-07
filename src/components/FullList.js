import React from 'react';

import {useList} from 'services/List';
import pluralize from 'pluralize';
import {NavLink} from 'react-router-dom';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
dayjs.extend(calendar);
/*
import {useHistory} from 'react-router-dom';
const history=useHistory();
*/

const bgc = ['bg-red', 'bg-orange', 'bg-yellow', 'bg-indigo','bg-green'];
function bg(i){
	if (!i) i=Math.floor(Math.random()*bgc.length);
	return bgc[i];
}


function List(props){
	const {nameFunc,object}=props;
	const {rows,error,fetching}=useList({object});
	if (fetching) return "Loading..";
	if (error) return <div className="alert alert-danger">{error}</div>;

	if (typeof nameFunc({})!='string') return "invalid nameFunc, result="+typeof (nameFunc({}));

	return <div className="list-group list-group-flush list-group-divider">
	  {rows.map((item,key)=>{
			return (
	  <div key={key} className="list-group-item">
	    <div className="list-group-item-figure">
				<div className={`tile tile-circle ${bg()}`}> {nameFunc(item).slice(0,1)}</div>
	    </div>
	    <div className="list-group-item-body">
	      <div className="d-sm-flex justify-content-sm-between align-items-sm-center">
	        <div className="team">
	          <h4 className="list-group-item-title">
	            <NavLink to={`/obj/${object}/${item.id}`}>{nameFunc(item)}</NavLink>
	            {item.owner &&
	            <a href="page-team.html" className="mention ml-1">Owner</a>
	            }
	          </h4>
	          <p className="list-group-item-text">Updated {dayjs(item.updated_at).calendar()}</p>
	        </div>
	        <ul className="list-inline text-muted mb-0">
	          <li className="list-inline-item mr-3" data-toggle="tooltip" title="Members" data-placement="bottom">
	            <i className="fas fa-users text-teal"></i> 5</li>
	          <li className="list-inline-item mr-3" data-toggle="tooltip" title="Clients" data-placement="bottom">
	            <i className="fas fa-user-tie text-pink"></i> 10</li>
	          <li className="list-inline-item mr-3" data-toggle="tooltip" title="Projects" data-placement="bottom">
	            <i className="fa fa-bookmark text-yellow"></i> 20</li>
	          	<li className="list-inline-item" data-toggle="tooltip" title="Public"><i className="fa fa-globe"></i></li>
	        </ul>
	      </div>
	    </div>
	    <div className="list-group-item-figure">
	      <a href="#" className="btn btn-sm btn-icon btn-secondary stop-propagation"><i className="fas fa-ellipsis-h"></i></a>
	    </div>
	  </div>
	)})}
	</div>;
}

export default function (props){
	const {object,nameFunc}=props;
	return <div className="page">
	  <div className="page-inner">
	    <header className="page-title-bar">
	      <div className="d-flex justify-content-between">
	        <h1 className="page-title">{pluralize(object)}</h1>
	        <div className="btn-toolbar">
	          <button type="button" className="btn btn-primary">Add {object}</button>
	        </div>
	      </div>
	    </header>

	    <div className="page-section">
	      <div className="card card-fluid">
	        <div className="card-header nav-scroller">
	          <ul className="nav nav-tabs card-header-tabs">
	            <li className="nav-item">
	              <a className="nav-link active show" data-toggle="tab" href="#project-myteams">My {pluralize(object)}</a>
	            </li>
	          </ul>
	        </div>

	        <div className="card-body">
	          <div className="row">
	            <div className="col">
	              <div className="input-group has-clearable">
	                <button type="button" className="close" aria-label="Close">
	                  <span aria-hidden="true"><i className="fa fa-times-circle"></i></span>
	                </button>
	                <div className="input-group-prepend">
	                  <span className="input-group-text"><span className="oi oi-magnifying-glass"></span></span>
	                </div>
	                <input type="text" className="form-control" placeholder="Search"/>
	              </div>
	            </div>

	            <div className="col-auto d-none d-sm-flex">
	              <div className="dropdown">
	                <button className="btn btn-secondary" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
	                  Last updated <span className="fa fa-caret-down"></span>
	                </button>
	                <div className="dropdown-menu dropdown-menu-right stop-propagation">
	                  <div className="dropdown-arrow"></div>
	                  <h6 className="dropdown-header">Sort By</h6>
	                  <label className="custom-control custom-radio">
	                    <input type="radio" className="custom-control-input" name="sortTeamsBy" value="0"/>
	                    <span className="custom-control-label">Name</span>
	                  </label>
	                  <label className="custom-control custom-radio">
	                    <input type="radio" className="custom-control-input" name="sortTeamsBy" value="1"/>
	                    <span className="custom-control-label">Name <span className="text-muted">(Decs)</span></span>
	                  </label>
	                  <label className="custom-control custom-radio">
	                    <input type="radio" className="custom-control-input" name="sortTeamsBy" value="2" checked/>
	                    <span className="custom-control-label">Last updated</span>
	                  </label>
	                  <label className="custom-control custom-radio">
	                    <input type="radio" className="custom-control-input" name="sortTeamsBy" value="3"/>
	                    <span className="custom-control-label">Oldest updated</span>
	                  </label>
	                  <label className="custom-control custom-radio">
	                    <input type="radio" className="custom-control-input" name="sortTeamsBy" value="4"/>
	                    <span className="custom-control-label">Last created</span>
	                  </label>
	                  <label className="custom-control custom-radio">
	                    <input type="radio" className="custom-control-input" name="sortTeamsBy" value="5"/>
	                    <span className="custom-control-label">Oldest created</span>
	                  </label>
	                </div>
	              </div>
	            </div>
	          </div>
	        </div>

	        <div className="text-muted px-3 mb-2">Showing 10 to 18 of 18 entries</div>

	        <div className="tab-content">
	          <div className="tab-pane fade show active" id="project-myteams" role="tabpanel">
	            <List {...props}/>
	            <ul className="pagination justify-content-center mt-4">
	              <li className="page-item">
	                <a className="page-link" href="#" tabIndex="-1"><i className="fa fa-angle-double-left"></i></a>
	              </li>
	              <li className="page-item">
	                <a className="page-link" href="#" tabIndex="-1">Prev</a>
	              </li>
	              <li className="page-item">
	                <a className="page-link" href="#">1</a>
	              </li>
	              <li className="page-item active">
	                <a className="page-link" href="#">2</a>
	              </li>
	              <li className="page-item disabled">
	                <a className="page-link" href="#">Next</a>
	              </li>
	              <li className="page-item disabled">
	                <a className="page-link" href="#"><i className="fa fa-angle-double-right"></i></a>
	              </li>
	            </ul>
	          </div>
	          <div className="tab-pane fade" id="project-explore-teams" role="tabpanel">
	            <div className="alert alert-warning mx-3">
	              You can search for public teams only!
	            </div>
	          </div>
	        </div>
	      </div>
	    </div>
	  </div>
	</div>

}
