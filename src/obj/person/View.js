import React from 'react';
/*---
layout: default
title: Profile
active: page-user.profile
pluginsCss:
  - flatpickr/flatpickr.min.css
pluginsJs:
  - flatpickr/flatpickr.min.js
  - chart.js/Chart.min.js
pageJs:
  - pages/profile-demo.js
---
*/
export default function(){
return <div class="page">
<header class="page-cover">
  <div class="text-center">
    <a href="user-profile.html" class="user-avatar user-avatar-xl">
      <img src="assets/images/avatars/profile.jpg" alt=""/>
    </a>
    <h2 class="h4 mt-2 mb-0">Beni Arisandi</h2>
    <div class="my-1">
      <i class="fa fa-star text-yellow"></i>
      <i class="fa fa-star text-yellow"></i>
      <i class="fa fa-star text-yellow"></i>
      <i class="fa fa-star text-yellow"></i>
      <i class="far fa-star text-yellow"></i>
    </div>
    <p class="text-muted">Project Manager @CreativeDivision</p>
    <p>Huge fan of HTML, CSS and Javascript. Web design and open source lover.</p>
  </div>

    <div class="cover-controls cover-controls-bottom">
    <a href="#" class="btn btn-light" data-toggle="modal" data-target="#followersModal">2,159 Followers</a>
    <a href="#" class="btn btn-light" data-toggle="modal" data-target="#followingModal">136 Following</a>
  </div>
  </header>

    <nav class="page-navs">
        <div class="nav-scroller">
            <div class="nav nav-center nav-tabs">
        <a class="nav-link active" href="user-profile.html">Overview</a>
        <a class="nav-link" href="user-activities.html">Activities <span class="badge">16</span></a>
        <a class="nav-link" href="user-teams.html">Teams</a>
        <a class="nav-link" href="user-projects.html">Projects</a>
        <a class="nav-link" href="user-tasks.html">Tasks</a>
        <a class="nav-link" href="user-profile-settings.html">Settings</a>
      </div>
          </div>
      </nav>

    <div class="page-inner">
        <div class="page-section">
            <div class="section-block">
        {" include ui/metrics-04.html "}

        <div class="d-flex justify-content-between align-items-center">
          <h1 class="section-title mb-0">Achievement</h1>
          {" include ui/dropdown-datepicker-02.html "}
        </div>
      </div>

            <div class="row">
                <div class="col-xl-8">
                    <div class="card card-body card-fluid">
                        <ul class="list-inline small">
              <li class="list-inline-item"><i class="fa fa-fw fa-circle text-teal"></i> Assigned tasks</li>
              <li class="list-inline-item"><i class="fa fa-fw fa-circle text-purple"></i> Completed tasks</li>
            </ul>

            <div class="chartjs" style={{height: "253px"}}>
              <canvas id="canvas-achievement"></canvas>
            </div>
          </div>
                  </div>

                <div class="col-xl-4">
                    <div class="card card-fluid">
                        <div class="card-header">Overview</div>

                        <div class="card-body">
              <dl class="d-flex justify-content-between">
                <dt class="text-left">
                  <span class="mr-2">Revenue</span>
                  <small class="text-success"><i class="fa fa-caret-up"></i> 87%</small>
                </dt>
                <dd class="text-right mb-0">
                  <strong>17,400</strong>
                  <small class="text-muted">USD</small>
                </dd>
              </dl>
              <dl class="d-flex justify-content-between mb-0">
                <dt class="text-left">
                  <span class="mr-2">Projects</span>
                  <small class="text-success"><i class="fa fa-caret-up"></i> 24%</small>
                </dt>
                <dd class="text-right mb-0">
                  <strong>5</strong>
                </dd>
              </dl>
            </div>

                        <div class="card-body border-top">
              <dl class="d-flex justify-content-between">
                <dt class="text-left">
                  <span class="mr-2">Expenses</span>
                  <small class="text-danger"><i class="fa fa-caret-down"></i> 12%</small>
                </dt>
                <dd class="text-right mb-0">
                  <strong>1,600</strong>
                  <small class="text-muted">USD</small>
                </dd>
            </dl>
						</div>
                        <div class="card-body border-top">
              <div class="summary">
                <p class="text-left">
                  <strong class="mr-2">Earnings</strong>
                  <small class="text-success"><i class="fa fa-caret-up"></i> 24%</small>
                </p>
                <p class="text-center">
                  <strong class="h3">15,800</strong>
                  <span class="text-muted">USD</span>
                </p>
              </div>
            </div>
                      </div>
                  </div>
              </div>

            <div class="row">
                <div class="col-xl-6">
                    <div class="card card-fluid">
                        <div class="card-header border-0">
                            <div class="d-flex align-items-center">
                <span class="mr-auto">Time Spent: Projects</span>
                                <div class="card-header-control">
                                    <div class="dropdown">
                    <button type="button" class="btn btn-icon btn-light" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="fa fa-fw fa-ellipsis-v"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right">
                      <div class="dropdown-arrow"></div>
                      <a href="#" class="dropdown-item">Actions</a>
                      <a href="#" class="dropdown-item">Goes here</a>
                      <a href="#" class="dropdown-item">Remove</a>
                    </div>
                  </div>
                                  </div>
                              </div>
                          </div>
                                    <div class="table-responsive">
                            <table class="table">
                {" include ui/table-03.html "}
              </table>
                          </div>
                                    <div class="card-footer">
              <a href="#" class="card-footer-item">View report <i class="fa fa-fw fa-angle-right"></i></a>
            </div>
                      </div>
                  </div>

                <div class="col-xl-6">
                    <div class="card card-fluid">
                        <div class="card-header border-0">
                            <div class="d-flex align-items-center">
                <span class="mr-auto">Time Spent: Tasks</span>
                                <div class="card-header-control">
                                    <div class="dropdown">
                    <button type="button" class="btn btn-icon btn-light" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <i class="fa fa-fw fa-ellipsis-v"></i>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right">
                      <div class="dropdown-arrow"></div>
                      <a href="#" class="dropdown-item">Actions</a>
                      <a href="#" class="dropdown-item">Goes here</a>
                      <a href="#" class="dropdown-item">Remove</a>
                    </div>
                  </div>
                                  </div>
                              </div>
                          </div>
                                    <div class="table-responsive">
                            <table class="table">
                {" include ui/table-04.html "}
              </table>
                          </div>
                                    <div class="card-footer">
              <a href="#" class="card-footer-item">View report <i class="fa fa-fw fa-angle-right"></i></a>
            </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
}
