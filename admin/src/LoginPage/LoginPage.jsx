import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // reset login status
        // this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        console.log(localStorage.getItem('user'));
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }

    

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;

        return (
           
            <div className="container-scroller">
            <div className="container-fluid page-body-wrapper full-page-wrapper">
              <div className="content-wrapper d-flex align-items-center auth auth-bg-1 theme-one">
                <div className="row w-100">
                  <div className="col-lg-4 mx-auto">
                  <h2 className="text-center mb-4" style={{color:'white'}}>LIS MANAGEMENT</h2>
                    <div className="auto-form-wrapper">
                      <form name="form" onSubmit={this.handleSubmit}>
                      <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                          <button className="btn btn-primary submit-btn btn-block" type='submit' onClick={this.handleSubmit}>Login</button>
                          {loggingIn && <div>
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" /></div>
                        }
                        </div>
                        <div className="form-group d-flex justify-content-between">
                          <div className="form-check form-check-flat mt-0">
                            <label className="form-check-label">
                              <input type="checkbox" className="form-check-input" defaultChecked /> Keep me signed in </label>
                          </div>
                          <a href="#" className="text-small forgot-password text-black">Forgot Password</a>
                        </div>
                      
                        <div className="text-block text-center my-3">
                          <span className="text-small font-weight-semibold">Not a member ?</span>
                          <a href="/register" className="text-black text-small">Create new account</a>
                        </div>
                      </form>
                    </div>
                    <ul className="auth-footer">
                      <li>
                        <a href="#">Conditions</a>
                      </li>
                      <li>
                        <a href="#">Help</a>
                      </li>
                      <li>
                        <a href="#">Terms</a>
                      </li>
                    </ul>
                    <p className="footer-text text-center">Copyright © 2021 LIS Management App. All rights reserved.</p>
                      </div>
                </div>
              </div>
            </div>
          </div>
              );

        
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 