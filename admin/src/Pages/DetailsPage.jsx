import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import './DetailsPage.css'
import OwnerComponent from '../_components/OwnerComponent';
import LandComponent from '../_components/LandComponent';
import RoCoComponent from '../_components/RoCoComponent';

class DetailsPage extends React.Component {

    render() {
        const { loggingIn } = this.props;

        return (
          <div className="container-scroller">
            <h1 className="text-center">Welcome to Owner Page</h1>
            <div className="container-fluid ">
              <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-4">
                  <OwnerComponent view={true}/>
                  
                </div>
                <div className="col-md-4">

                  <LandComponent view={true}/>
                  
                </div>

                
              </div>
              <div className="row">
                <div className="col-md-2"></div>
                <div className="col-lg-8">
                  <RoCoComponent view={true}/>
                  <div className="d-flex justify-content-center edit-button-div mt-1">
                    <Link to="/edit"><button className="btn btn-primary submit-btn btn-block edit-button .align-self-center" type='submit' >Edit</button></Link>
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

const connectedDetailsPage = connect(mapStateToProps)(DetailsPage);
export { connectedDetailsPage as DetailsPage }; 