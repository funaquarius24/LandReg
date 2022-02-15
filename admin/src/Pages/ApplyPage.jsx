import React from 'react';
import { connect } from 'react-redux';

import './ApplyPage.css';
import TabbedComponent from '../_components/TabbedComponent';

import { landActions } from '../_actions/land.actions';

class ApplyPage extends React.Component {

  constructor(props){
    super(props);
  }

    render() {
        const ownerCompState = {};
        const landCompState = {};
        const rocoCompState = {};

        return (
          <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper">
                    <div className="content-wrapper d-flex auth auth-bg-1 theme-one">
                        <div className="row w-100">
                                <div className="container">
                                    <div className="row mt-5">
                                        <div className="col-md-8 mx-auto">
                                            <div className="form-wrapper">
                                                <div className="row">
                                                    <div className="col-md-12 text-center">
                                                        <h4>The Application Form</h4> 
                                                    </div>
                                                </div>
                                                <div className="row align-items-center">
                                                  <TabbedComponent />
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
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