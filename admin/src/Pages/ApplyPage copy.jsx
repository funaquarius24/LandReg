import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import './ApplyPage.css'
import OwnerComponent from '../_components/OwnerComponent';
import LandComponent from '../_components/LandComponent';
import RoCoComponent from '../_components/RoCoComponent';

import { landActions } from '../_actions/land.actions';

class ApplyPage extends React.Component {

  constructor(props){
    super(props);
  }

    render() {
        const ownerCompState = {};
        const landCompState = {};
        const rocoCompState = {};

        const handleSubmitClicked = () => {
          const formState = {ownerCompState: ownerCompState, landCompState: landCompState, rocoCompState: rocoCompState}
          this.props.dispatch(landActions.apply_details_submitted(formState));
        }


        return (
          <div className="container-scroller">
            <h1 className="text-center">Welcome to Owner Page</h1>
            <div className="container-fluid ">
              <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-4">
                  <OwnerComponent create_view={true}  ownerCompState={ownerCompState} />
                  
                </div>
                <div className="col-md-4">
                  <LandComponent create_view={true}  landCompState={landCompState}  />
                </div>

                
              </div>
              <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                  <RoCoComponent create_view={true}  rocoCompState={rocoCompState} />
                  <div className="d-flex justify-content-center edit-button-div mt-1">
                    <button className="btn btn-primary submit-btn btn-block edit-button .align-self-center" type='submit' onClick={handleSubmitClicked} >Submit</button>
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

const connectedApplyPage = connect(mapStateToProps)(ApplyPage);
export { connectedApplyPage as ApplyPage }; 