import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { Header } from '../_components';
import { Nav } from '../_components';
import './Dashboard.css'
import EnhancedTable from '../_components/SearchTable';

class Dashboard extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            submitted: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        // this.props.dispatch(userActions.getAll());
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
        const { user, users } = this.props;
        return (
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper container-background">
                    <div className="container-fluid ">
                        <div className='row'>
                            <div className="col-md-2"></div>
                            <div className="col-md-8 content-background">
                                <h2 className="text-center mt-2">Welcome to the LIS App.</h2>
                                <div className="d-flex bd-highlight">
                                    <div className="p-2 m-2 bd-highlight">Email: {user.email}</div>
                                    <div className="p-2 m-2 bd-highlight">Address: {user.wAddress}</div>
                                </div>
                                <div>
                                    No document selected. Please search below.
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 grid-margin stretch-card">
                                        <div className="card">
                                            <div className="card-body">
                                                <h4 className="card-title">SEARCH</h4>
                                                <div className="row bg-primary">
                                                    <form className="form">
                                                        <div className="form-content">
                                                            <div className="row">
                                                                <div className="col-sm-4 ">
                                                                    <div className="form-group">
                                                                        <label htmlFor="filename">File Name: </label>
                                                                        <input type="text" className="form-control" name="filename" onChange={this.handleChange}></input>
                                                                    </div>
                                                                    
                                                                </div>
                                                                <div className="col-sm-4 ">
                                                                    <div className="form-group">
                                                                        <label htmlFor="cadzone">Cadzone: </label>
                                                                        <input type="text" className="form-control" name="cadzone" onChange={this.handleChange}></input>
                                                                    </div>
                                                                    
                                                                </div>
                                                                <div className="col-sm-4 ">
                                                                    <div className="form-group">
                                                                        <label htmlFor="plotNumber">Plot Number: </label>
                                                                        <input type="text" className="form-control" name="plotNumber" onChange={this.handleChange}></input>
                                                                    </div>
                                                                    
                                                                </div>
                                                                <div className="col-sm-4 ">
                                                                    <div className="form-group">
                                                                        <label htmlFor="firstName">First Name: </label>
                                                                        <input type="text" className="form-control" name="firstName" onChange={this.handleChange}></input>
                                                                    </div>
                                                                    
                                                                </div>
                                                                <div className="col-sm-4 ">
                                                                    <div className="form-group">
                                                                        <label htmlFor="lastName">Last Name: </label>
                                                                        <input type="text" className="form-control" name="lastName" onChange={this.handleChange}></input>
                                                                    </div>
                                                                    
                                                                </div>
                                                                <div className="col-sm-4 ">
                                                                    <div className="form-group">
                                                                        <button className="btnSubmit mt-4" type='submit' onClick={this.handleSubmit}>Search</button>
                                                                    </div>
                                                                    
                                                                </div>
                                                                
                                                            </div>
                                                        </div>
                                                    </form>                                                  
                                                </div>
                                            </div>    
                                        </div>  
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-1"></div>
                                    <div className="col-md-10">
                                        <p>Search Results</p>
                                        <EnhancedTable />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedDashboard = connect(mapStateToProps)(Dashboard);
export { connectedDashboard as Dashboard };