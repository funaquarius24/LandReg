import React from 'react';
import { connect } from 'react-redux';

import { alertActions, userActions } from '../_actions';
import './Dashboard.css'
import EnhancedTable from '../_components/SearchTable';
import ToggleSwitch from '../_components/ToggleSwitch';
import { searchActions } from '../_actions/search.action';

class Dashboard extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            searchClicked: false,
            search_type_is_land: true
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        // this.props.dispatch(userActions.getAll());
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });

    }

    handleSearch(e) {
        e.preventDefault();

        this.setState({ searchClicked: true });
        const { username, password } = this.state;
        const { id, state,  cadzone, district, plotNumber, email, key} = this.state;
        const { dispatch } = this.props;
        
        const data = {};

        if (this.state.search_type_is_land) {
            if(id){
                console.log("Should search with ID!");
                data.id = id;
                dispatch(searchActions.land_search_id(data));
            }
            else if (state && !(cadzone && district && plotNumber)){
                console.log("Should search using state information!");
                data.state = state;
                dispatch(searchActions.land_search_id(data));
            }
            else if (state && (cadzone && district && plotNumber)){
                console.log("Should search using all information!");
                data.state = state;
                data.district = district;
                data.cadzone = cadzone;
                data.plotNumber = plotNumber;
                dispatch(searchActions.land_search_id(data));
            }else{
                console.log("No enough information to search!");
                dispatch(alertActions.error("No enough information to search!"));
            }
        }
        else{
            if(key){
                data.key = key;
                dispatch(searchActions.land_search_user(data));
                console.log("Should search using key information!");
            }else if(email){
                data.email = email;
                dispatch(searchActions.land_search_user(data));
                console.log("Should search using email information!");
            }else{
                console.log("No enough information to search!");
                dispatch(alertActions.error("No enough information to search!"));
            }
            
        }
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
                                                                <div className="col-sm-1 ">
                                                                    <div className="form-group">
                                                                        <label htmlFor="state">ID: </label>
                                                                        <input type="text" className="form-control" name="id" onChange={this.handleChange}></input>
                                                                    </div>
                                                                    
                                                                </div>
                                                                <div className="col-sm-2 ">
                                                                    <div className="form-group">
                                                                        <label htmlFor="state">State: </label>
                                                                        <input type="text" className="form-control" name="state" onChange={this.handleChange}></input>
                                                                    </div>
                                                                    
                                                                </div>
                                                                <div className="col-sm-3 ">
                                                                    <div className="form-group">
                                                                        <label htmlFor="cadzone">Cadzone: </label>
                                                                        <input type="text" className="form-control" name="cadzone" onChange={this.handleChange}></input>
                                                                    </div>
                                                                    
                                                                </div>
                                                                <div className="col-sm-3 ">
                                                                    <div className="form-group">
                                                                        <label htmlFor="plotNumber">District: </label>
                                                                        <input type="text" className="form-control" name="district" onChange={this.handleChange}></input>
                                                                    </div>
                                                                    
                                                                </div>
                                                                <div className="col-sm-3 ">
                                                                    <div className="form-group">
                                                                        <label htmlFor="plotNumber">Plot Number: </label>
                                                                        <input type="text" className="form-control" name="plotNumber" onChange={this.handleChange}></input>
                                                                    </div>
                                                                    
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-sm-3 ">
                                                                    <div className="form-group">
                                                                        <label htmlFor="firstName">Email: </label>
                                                                        <input type="text" className="form-control" name="email" onChange={this.handleChange}></input>
                                                                    </div>
                                                                    
                                                                </div>
                                                                <div className="col-sm-4 ">
                                                                    <div className="form-group">
                                                                        <label htmlFor="lastName">Key: </label>
                                                                        <input type="text" className="form-control" name="key" onChange={this.handleChange}></input>
                                                                    </div>
                                                                    
                                                                </div>
                                                                <div className="col-sm-2 ">
                                                                    <div className="form-group mt-4">
                                                                        <ToggleSwitch statevar = {this.state} />
                                                                    </div>
                                                                    
                                                                </div>
                                                                <div className="col-sm-3">
                                                                    <div className="form-group">
                                                                        <button className="btnSubmit mt-4" type='submit' onClick={this.handleSearch}>Search</button>
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