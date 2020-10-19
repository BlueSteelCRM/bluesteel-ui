import React from 'react';
import menu from '_data/aside-menu.json';

export default function(){
	return <aside className="app-aside app-aside-expand-md app-aside-light">

        <div className="aside-content">

          <header className="aside-header d-block d-md-none">

            <button className="btn-account" type="button" data-toggle="collapse" data-target="#dropdown-aside">
						<span className="user-avatar user-avatar-lg"><img src="assets/images/avatars/profile.jpg" alt=""/></span>
						 <span className="account-icon"><span className="fa fa-caret-down fa-lg"></span></span> <span className="account-summary"><span className="account-name">The Conductor</span> <span className="account-description">Marketing Manager</span></span></button>

            <div id="dropdown-aside" className="dropdown-aside collapse">

              <div className="pb-3">
                <a className="dropdown-item" href="user-profile.html"><span className="dropdown-icon oi oi-person"></span> Profile</a> <a className="dropdown-item" href="auth-signin-v1.html"><span className="dropdown-icon oi oi-account-logout"></span> Logout</a>
                <div className="dropdown-divider"></div><a className="dropdown-item" href="#">Help Center</a> <a className="dropdown-item" href="#">Ask Forum</a> <a className="dropdown-item" href="#">Keyboard Shortcuts</a>
              </div>
            </div>
          </header>

					<div class="aside-menu overflow-hidden">

			      <nav id="stacked-menu" class="stacked-menu">

			        <ul class="menu">
							{menu["aside-menu"].map((levelMenu,key)=>{
								return <li key={key} className={`menu-item has-active${levelMenu.isSlim && "menu-item-slim"}${levelMenu.childs&& "has-child"}`}>
								  <a href="{{levelMenu.link}}" class="menu-link">
								    {levelMenu.icon &&
								    <span class="menu-icon {{levelMenu.icon}}"></span>}

								    {levelMenu.text &&
								    <span class="menu-text">{levelMenu.text}</span>}
								    {levelMenu.indicator &&
								    <span class="{{levelMenu.indicatorClasses}}">{levelMenu.indicator}</span>}
								  </a>
								  {levelMenu.childs &&
									<ul class="menu">
									  {levelMenu.childs.map((menuItem,i)=>{
											return <li class="menu-item">
									    <a href={menuItem.link} className="menu-link">
									      {menuItem.text}
									    </a>
									  </li>
									})}
									</ul>}
								</li>
								})}
			        </ul>
			      </nav>
			    </div>

          <footer className="aside-footer border-top p-2">
            <button className="btn btn-light btn-block text-primary" data-toggle="skin"><span className="d-compact-menu-none">Night mode</span> <i className="fas fa-moon ml-1"></i></button>
          </footer>
        </div>
      </aside>;
	}
