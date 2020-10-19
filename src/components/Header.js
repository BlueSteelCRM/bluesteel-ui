import React from 'react';

export default function(){
	return <header className="app-header app-header-dark">

  <div className="top-bar">

    <div className="top-bar-brand">

      <button className="hamburger hamburger-squeeze mr-2" type="button" data-toggle="aside-menu" aria-label="toggle aside menu">
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>

      <a href="/">
        <img id="logo" height="48" src="/images/logos/wide_logo_white.png" alt="logo"/>
      </a>
    </div>



    <div className="top-bar-list">

      <div className="top-bar-item px-2 d-md-none d-lg-none d-xl-none">

        <button className="hamburger hamburger-squeeze" type="button" data-toggle="aside" aria-label="toggle menu">
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>

      </div>



      <div className="top-bar-item top-bar-item-full">

        <form className="top-bar-search">

          <div className="input-group input-group-search dropdown">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <span className="oi oi-magnifying-glass"></span>
              </span>
            </div>
            <input type="text" className="form-control" data-toggle="dropdown" aria-label="Search" placeholder="Search"/>

            <div className="dropdown-menu dropdown-menu-rich dropdown-menu-xl ml-n4 mw-100">
              <div className="dropdown-arrow ml-3"></div>

              <div className="dropdown-scroll perfect-scrollbar h-auto" style={{maxHeight: "360px"}}>

                <div className="list-group list-group-flush list-group-reflow mb-2">
                  <h6 className="list-group-header d-flex justify-content-between">
                    <span>Shortcut</span>
                  </h6>

                  <div className="list-group-item py-2">
                    <a href="#" className="stretched-link"></a>
                    <div className="tile tile-sm bg-muted">
                      <i className="fas fa-user-plus"></i>
                    </div>
                    <div className="ml-2">Create user</div>
                  </div>


                  <div className="list-group-item py-2">
                    <a href="#" className="stretched-link"></a>
                    <div className="tile tile-sm bg-muted">
                      <i className="fas fa-dollar-sign"></i>
                    </div>
                    <div className="ml-2">Create invoice</div>
                  </div>

                  <h6 className="list-group-header d-flex justify-content-between mt-2">
                    <span>In projects</span>
                    <a href="#" className="font-weight-normal">Show more</a>
                  </h6>

                  <div className="list-group-item py-2">
                    <a href="#" className="stretched-link">
                      <span className="sr-only">Go to search result</span>
                    </a>
                    <div className="user-avatar user-avatar-sm bg-muted">
                      <img src="assets/images/avatars/bootstrap.svg" alt=""/>
                    </div>
                    <div className="ml-2">
                      <div className="mb-n1">Bootstrap</div>
                      <small className="text-muted">Just now</small>
                    </div>
                  </div>


                  <div className="list-group-item py-2">
                    <a href="#" className="stretched-link">
                      <span className="sr-only">Go to search result</span>
                    </a>
                    <div className="user-avatar user-avatar-sm bg-muted">
                      <img src="assets/images/avatars/slack.svg" alt=""/>
                    </div>
                    <div className="ml-2">
                      <div className="mb-n1">Slack</div>
                      <small className="text-muted">Updated 25 minutes ago</small>
                    </div>
                  </div>


                  <h6 className="list-group-header d-flex justify-content-between mt-2">
                    <span>Another section</span>
                    <a href="#" className="font-weight-normal">Show more</a>
                  </h6>

                  <div className="list-group-item py-2">
                    <a href="#" className="stretched-link">
                      <span className="sr-only">Go to search result</span>
                    </a>
                    <div className="tile tile-sm bg-muted">P</div>
                    <div className="ml-2">
                      <div className="mb-n1">Product name</div>
                    </div>
                  </div>

                </div>

              </div>

              <a href="#" className="dropdown-footer">Show all results</a>
            </div>

          </div>

        </form>

      </div>



      <div className="top-bar-item top-bar-item-right px-0 d-none d-sm-flex">

        <ul className="header-nav nav">

          <li className="nav-item dropdown header-nav-dropdown has-notified">
            <a className="nav-link" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="oi oi-pulse"></span>
            </a>
            {" include ui/dropdown-notifications.html "}
          </li>


          <li className="nav-item dropdown header-nav-dropdown has-notified">
            <a className="nav-link" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="oi oi-envelope-open"></span>
            </a>
            {" include ui/dropdown-messages.html "}
          </li>


          <li className="nav-item dropdown header-nav-dropdown">
            <a className="nav-link" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="oi oi-grid-three-up"></span>
            </a>
            {" include ui/dropdown-sheets.html "}
          </li>

        </ul>



        <div className="dropdown d-none d-md-flex">
          <button className="btn-account" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="user-avatar user-avatar-md">
              <img src="assets/images/avatars/profile.jpg" alt=""/>
            </span>
            <span className="account-summary pr-lg-4 d-none d-lg-block">
              <span className="account-name">The Conductor</span>
              <span className="account-description">Marketing Manager</span>
            </span>
          </button>

          <div className="dropdown-menu">
            <div className="dropdown-arrow d-lg-none" x-arrow="true"></div>
            <div className="dropdown-arrow ml-3 d-none d-lg-block"></div>
            <h6 className="dropdown-header d-none d-md-block d-lg-none">The Conductor</h6>
            <a className="dropdown-item" href="user-profile.html"><span className="dropdown-icon oi oi-person"></span> Profile</a>
            <a className="dropdown-item" href="auth-signin-v1.html"><span className="dropdown-icon oi oi-account-logout"></span> Logout</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">Help Center</a>
            <a className="dropdown-item" href="#">Ask Forum</a>
            <a className="dropdown-item" href="#">Keyboard Shortcuts</a>
          </div>

        </div>

      </div>

    </div>

  </div>

</header>;
}
