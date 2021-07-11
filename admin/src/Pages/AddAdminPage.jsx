import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import './AddAdminPage.css'

class AddAdminPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                            <section className="contact-from pt-4">
                                <div className="container">
                                    <div className="row mt-5">
                                        <div className="col-md-7 mx-auto">
                                            <div className="form-wrapper">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <h4>Add New Admin form</h4> </div>
                                                </div>
                                                <form _lpchecked="1">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <input type="text" className="form-control" placeholder="First name" /> </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <input type="text" className="form-control" placeholder="Last name" /> </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <input type="email" className="form-control" placeholder="Email" /> </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <input type="text" className="form-control" placeholder="Phone number" /> </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <input type="password" className="form-control" placeholder="Password" /> </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <select name="role" className="custom-select" id="exampleFormControlSelect1">
                                                                <option>Select country</option>
                                                                <option>India</option>
                                                                <option>USA</option>
                                                                <option>France</option>
                                                                <option>China</option>
                                                                <option>Japan</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3">
                                                        <button className="btn btn-primary">Add</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
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

const connectedAddAdminPage = connect(mapStateToProps)(AddAdminPage);
export { connectedAddAdminPage as AddAdminPage }; 