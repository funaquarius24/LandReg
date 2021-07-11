import React, { Component } from 'react'

export class Nav extends Component {
    render() {
        return (
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav">
              <li className="nav-item nav-profile">
                <a href="#" className="nav-link">
                  <div className="profile-image">
                    <img className="img-xs rounded-circle" src="assets/images/faces/face8.jpg" alt="profile image" />
                    <div className="dot-indicator bg-success" />
                  </div>
                  <div className="text-wrapper">
                    <p className="profile-name">LIS ADMIN</p>
                    <p className="designation">Admin</p>
                  </div>
                </a>
              </li>
              <li className="nav-item nav-category"> <a href="/">Admin</a>  <a href="/user">User</a></li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  <i className="menu-icon typcn typcn-document-text" />
                  <span className="menu-title">Dashboard</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/organization">
                  <i className="menu-icon typcn typcn-shopping-bag" />
                  <span className="menu-title">Organization</span>
                </a>
              </li>
             
              <li className="nav-item">
                <a className="nav-link" href="/r-of-c">
                  <i className="menu-icon typcn typcn-th-large-outline" />
                  <span className="menu-title">R of O</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="co">
                  <i className="menu-icon typcn typcn-bell" />
                  <span className="menu-title">C of O</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="printOut">
                  <i className="menu-icon typcn typcn-user-outline" />
                  <span className="menu-title">Print Out</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
                  <i className="menu-icon typcn typcn-document-add" />
                  <span className="menu-title">Settings</span>
                  <i className="menu-arrow" />
                </a>
                <div className="collapse" id="auth">
                  <ul className="nav flex-column sub-menu">
                    <li className="nav-item">
                      <a className="nav-link" href="/profile"> Profile </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/password"> Change Password </a>
                    </li>

                    <li className="nav-item">
                      <a className="nav-link" href="/add-user"> Add Member </a>
                    </li>
                  
                  </ul>
                </div>
              </li>
            </ul>
          </nav>
        )
    }
}
