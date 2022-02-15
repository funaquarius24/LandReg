import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import './AddAdminPage.css'

class AddAdminPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            phone: '',
            state: '',
            district: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, state } = this.state;
        const { dispatch } = this.props;
        if (email && state) {
            dispatch(userActions.addAdmin(this.state));
        }
    }

    handleDropdownChange(e) {
        const { name, value } = e.target;
        // console.log('name: ', name, 'value: ', value);
        this.setState({ [name]: value });
        // console.log("state: ", this.state);

    }

    

    render() {
        // const { loggingIn } = this.props;
        // const { username, password, submitted } = this.state;
        const nig_states_array = [
            "Abia",
            "Adamawa",
            "Akwa Ibom",
            "Anambra",
            "Bauchi",
            "Bayelsa",
            "Benue",
            "Borno",
            "Cross River",
            "Delta",
            "Ebonyi",
            "Edo",
            "Ekiti",
            "Enugu",
            "FCT - Abuja",
            "Gombe",
            "Imo",
            "Jigawa",
            "Kaduna",
            "Kano",
            "Katsina",
            "Kebbi",
            "Kogi",
            "Kwara",
            "Lagos",
            "Nasarawa",
            "Niger",
            "Ogun",
            "Ondo",
            "Osun",
            "Oyo",
            "Plateau",
            "Rivers",
            "Sokoto",
            "Taraba",
            "Yobe",
            "Zamfara"
          ]
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
                                                                <input type="text" className="form-control" name="name" placeholder="First name" onChange={this.handleChange} /> </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <input type="text" className="form-control" placeholder="Last name"  onChange={this.handleChange} /> </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <input type="email" className="form-control" name="email" placeholder="Email"  onChange={this.handleChange} /> </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <input type="text" className="form-control" name="phone" placeholder="Phone number"  onChange={this.handleChange} /> 
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <input type="password" className="form-control" name="password" placeholder="Password"  onChange={this.handleChange} /> 
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <select name="state" className="custom-select" id="exampleFormControlSelect" onChange={this.handleDropdownChange}>
                                                                
                                                                <option>Select State</option>{
                                                                    nig_states_array.map( (x,y) => 
                                                                    <option key={y}>{x}</option> )
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className="col-md-6 mt-3">
                                                            <div className="form-group">
                                                                <input type="text" className="form-control" name="district" placeholder="District"  onChange={this.handleChange} /> 
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-3">
                                                        <button className="btn btn-primary" onClick={this.handleSubmit}>Add</button>
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