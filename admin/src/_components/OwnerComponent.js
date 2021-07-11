import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import "./components.css"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
}));

export default function OwnerComponent(props) {
  const classes = useStyles();
  const { view, create } = props;  

  const state = {
    name: "",
    gender: "",
    dob: "",
    address: "",
    nin: "",
    phone1: "",
    phone2: "",
    email: "",
    walletAddress: "",
    password: ""
    
  }


  const manageInputTag = () => {
      
    let elements = document.getElementsByTagName("input");
    
    console.log("view: ", view); 

    console.log("element: ", elements[0]);
    return view ? disableInputs(elements) : enableInputs(elements);;
  }

  const disableInputs = (elements) => {
    [...elements].forEach(element => {
      element.setAttribute("diasbled", true);
      console.log("element: ", elements);
    });
  }

  const enableInputs = (elements) => {
    [...elements].forEach(element => {
      element.removeAttribute("diasbled")
      console.log("element: ", elements);
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setState({ [name]: value });
    state[name] = value;
  }


  // manageInputTag();
  let elements = document.getElementsByTagName("input");

  const viewLayout = () => {
    return (
      <div className={classes.root} onLoad={manageInputTag}>
        <div className="container-fluid raised-box raised-box-theme">
          <p>Name:    <input type="text" className="form-control short-text-input-60" name="name" defaultValue="Ismail" disabled  onChange={handleChange} /></p>
          <p>Gender:  <input type="text" className="form-control short-text-input-60" name="gender" value="test" disabled onChange={handleChange} /></p>
          <p>DOB:     <input type="text" className="form-control short-text-input-60" name="dob" value="test" disabled onChange={handleChange} /></p>
          <p>Address: <input type="text" className="form-control short-text-input-80" name="address" value="test" disabled onChange={handleChange} /></p>
          <p>Nin:    <input type="text" className="form-control short-text-input-60" name="nin" defaultValue="Ismail" disabled  onChange={handleChange} /></p>
          <p>Phone1:  <input type="text" className="form-control short-text-input-60" name="phone1" value="test" disabled onChange={handleChange} /></p>
          <p>Phone2:  <input type="text" className="form-control short-text-input-60" name="phone2" value="test" disabled onChange={handleChange} /></p>
          <p>Email:  <input type="text" className="form-control short-text-input-60" name="email" value="test" disabled onChange={handleChange} /></p>
          <p>Wallet Address: <input type="text" className="form-control short-text-input-80" name="walletAddress" value="test" disabled onChange={handleChange} /></p>
              
          </div>
      </div>
    );
  }

  const editLayout = () => {
    return (
      <div className={classes.root} onLoad={manageInputTag}>
        <div className="container-fluid raised-box raised-box-theme">
          <p>Name:    <input type="text" className="form-control short-text-input-60" name="name" defaultValue="Ismail"  onChange={handleChange} /></p>
          <p>Gender:  <input type="text" className="form-control short-text-input-40" name="gender" defaultValue="test" onChange={handleChange} /> DOB:     
            <input type="text" className="form-control short-text-input-40" name="dob" defaultValue="test" onChange={handleChange} /> </p>
          <p></p>
          <p>Address: <input type="text" className="form-control short-text-input-60" name="address" defaultValue="test" onChange={handleChange} /></p>
          <p>Nin: <input type="text" className="form-control short-text-input-80" name="nin" defaultValue="test" onChange={handleChange} /></p>
          <p>Phone1:  <input type="text" className="form-control short-text-input-60" name="phone1" defaultValue="test" onChange={handleChange} /></p>
          <p>Phone2:  <input type="text" className="form-control short-text-input-60" name="phone2" defaultValue="test" onChange={handleChange} /></p>
          <p>Email:  <input type="text" className="form-control short-text-input-60" name="email" defaultValue="test" onChange={handleChange} /></p>
          <p>Wallet Address: <input type="text" className="form-control short-text-input-80" name="walletAddress" defaultValue="test" onChange={handleChange} /></p>
              
          </div>
      </div>
    );
  }

  const createLayout = () => {
    return (
      <div className={classes.root} onLoad={manageInputTag}>
        <div className="container-fluid raised-box raised-box-theme">
          <p>Name:    <input type="text" className="form-control short-text-input-60" name="name" placeholder="Ismail"  onChange={handleChange} /></p>
          <p>Gender:  <input type="text" className="form-control short-text-input-60" name="gender" placeholder="test" onChange={handleChange} /></p>
          <p>DOB:     <input type="date" className="form-control short-text-input-60" name="dob" placeholder="test" onChange={handleChange} /></p>
          <p>Address: <input type="text" className="form-control short-text-input-80" name="address" placeholder="test" onChange={handleChange} /></p>
          <p>Nin: <input type="text" className="form-control short-text-input-80" name="nin" placeholder="test" onChange={handleChange} /></p>
          <p>Phone1:  <input type="text" className="form-control short-text-input-60" name="phone1" placeholder="test" onChange={handleChange} /></p>
          <p>Phone2:  <input type="text" className="form-control short-text-input-60" name="phone2" placeholder="test" onChange={handleChange} /></p>
          <p>Email:  <input type="text" className="form-control short-text-input-60" name="email" placeholder="test" onChange={handleChange} /></p>
          <p>Password: <input type="text" className="form-control short-text-input-80" name="password" placeholder="test" onChange={handleChange} /></p>
              
          </div>
      </div>
    );
  }
  


  return (
    create? createLayout() : view ? viewLayout() : editLayout()
  );
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedOwnerComponent = connect(mapStateToProps)(OwnerComponent);
export { connectedOwnerComponent as OwnerComponent }; 