import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import './EditPage.css'
import OwnerComponent from '../_components/OwnerComponent';
import LandComponent from '../_components/LandComponent';
import RoCoComponent from '../_components/RoCoComponent';

import { landActions } from '../_actions/land.actions';

class EditPage extends React.Component {

  constructor(props){
    super(props);
  }

    render() {
        const ownerCompState = {};
        const landCompState = {};
        const rocoCompState = {};

        const handleSubmitClicked = () => {
          const formState = {ownerCompState: ownerCompState, landCompState: landCompState, rocoCompState: rocoCompState}
          console.log("edit_page form state: ", formState);
          this.props.dispatch(landActions.edit_details_submitted(formState));
        }

        

        return (
          <div className="container-scroller">
            <h1 className="text-center">Welcome to Owner Page</h1>
            <div className="container-fluid ">
              <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-4">
                  <OwnerComponent view={false} ownerCompState={ownerCompState} />
                  
                </div>
                <div className="col-md-4">

                  <LandComponent view={false} landCompState={landCompState}  />
                  
                </div>

                
              </div>
              <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                  <RoCoComponent view={false} rocoCompState={rocoCompState} />
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

const connectedEditPage = connect(mapStateToProps)(EditPage);
export { connectedEditPage as EditPage }; 