import React from 'react';

/*
---
layout: default
title: Dashboard
active: dashboard
pluginsCss:
  - flatpickr/flatpickr.min.css
pluginsJs:
  - flatpickr/flatpickr.min.js
  - easy-pie-chart/jquery.easypiechart.min.js
  - chart.js/Chart.min.js
pageJs:
  - pages/dashboard-demo.js
---
*/
export default function Index(){
return <div className="page">

  <div className="page-inner">

    <header className="page-title-bar">
      <div className="d-flex flex-column flex-md-row">
        <p className="lead">
          <span className="font-weight-bold">Hi, Beni.</span>
          <span className="d-block text-muted">Here’s what’s happening with your business today.</span>
        </p>
        <div className="ml-auto">
          {" include ui/dropdown-datepicker-01.html "}
        </div>
      </div>
    </header>



    <div className="page-section">

      <div className="section-block">
        {" include ui/metrics-06.html "}
      </div>



      <div className="row">

        <div className="col-12 col-lg-12 col-xl-4">

          <div className="card card-fluid">

            <div className="card-body">
              <h3 className="card-title mb-4">Completion Tasks</h3>

              <div className="chartjs" style={{height: "292px"}}>
                <canvas id="completion-tasks"></canvas>
              </div>
            </div>

          </div>

        </div>



        <div className="col-12 col-lg-6 col-xl-4">

          <div className="card card-fluid">

            <div className="card-body">
              <h3 className="card-title">Tasks Performance</h3>

              <div className="text-center pt-3">
                <div className="chart-inline-group" style={{height:"214px"}}>
                  <div className="easypiechart" data-toggle="easypiechart" data-percent="60" data-size="214" data-bar-color="#346CB0" data-track-color="false" data-scale-color="false" data-rotate="225"></div>
                  <div className="easypiechart" data-toggle="easypiechart" data-percent="50" data-size="174" data-bar-color="#00A28A" data-track-color="false" data-scale-color="false" data-rotate="225"></div>
                  <div className="easypiechart" data-toggle="easypiechart" data-percent="75" data-size="134" data-bar-color="#5F4B8B" data-track-color="false" data-scale-color="false" data-rotate="225"></div>
                </div>
              </div>

            </div>


            <div className="card-footer">
              <div className="card-footer-item">
                <i className="fa fa-fw fa-circle text-indigo"></i> 100%
                <div className="text-muted small">Assigned</div>
              </div>
              <div className="card-footer-item">
                <i className="fa fa-fw fa-circle text-purple"></i> 75%
                <div className="text-muted small">Completed</div>
              </div>
              <div className="card-footer-item">
                <i className="fa fa-fw fa-circle text-teal"></i> 60%
                <div className="text-muted small">Active</div>
              </div>
            </div>

          </div>

        </div>



        <div className="col-12 col-lg-6 col-xl-4">

          <div className="card card-fluid">

            <div className="card-body pb-0">
              <h3 className="card-title">Leaderboard</h3>


              <ul className="list-inline small">
                <li className="list-inline-item"><i className="fa fa-fw fa-circle text-light"></i> Tasks</li>
                <li className="list-inline-item"><i className="fa fa-fw fa-circle text-purple"></i> Completed</li>
                <li className="list-inline-item"><i className="fa fa-fw fa-circle text-teal"></i> Active</li>
                <li className="list-inline-item"><i className="fa fa-fw fa-circle text-red"></i> Overdue</li>
              </ul>

            </div>


            {" include ui/leaderboard-01.html "}
          </div>

        </div>

      </div>



      <div className="card-deck-xl">

        <div className="card card-fluid pb-3">
          <div className="card-header">Active Projects</div>
          {" include ui/project-list-01.html "}
        </div>



        <div className="card card-fluid">
          <div className="card-header">Active Tasks: To-Dos</div>

          <div className="card-body">
            {" include ui/todo-list-01.html "}
          </div>


          <div className="card-footer">
            <a href="#" className="card-footer-item">View all <i className="fa fa-fw fa-angle-right"></i></a>
          </div>

        </div>

      </div>

    </div>

  </div>

</div>

};
