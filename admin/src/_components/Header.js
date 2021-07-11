import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class Header extends Component {
  constructor(props) {
    super(props);
  }
    render() {
        return (

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">Home</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
          
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to='/details'>Details </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='/edit'>Edit</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='/apply'>Apply</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='/addAdmin'>Add Admin</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='/cofo'>CofO</Link>
                </li>
                <li className="nav-item mr-1">
                  <Link className="nav-link" to='/login'><button className="btn btn-danger" type="submit">Logout</button></Link>
                </li>
              </ul>
            </div>
          </nav>
          )
    }
}
