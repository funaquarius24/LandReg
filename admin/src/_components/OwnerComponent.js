import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import "./components.css"

import {  landActions, userActions } from '../_actions';

import {useDispatch, useSelector} from "react-redux"; 


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
}));

export default function OwnerComponent(props) {
  const classes = useStyles();
  const { view, create, ownerCompState } = props;  

  const local_state = {
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

  const dispatch = useDispatch();
  const landOwnerInfo = useSelector(state => state.landOwner);
  
  // console.log("landOwnerInfo: ", landOwnerInfo);

  if(landOwnerInfo.items && Object.keys(landOwnerInfo).length > 0){
    // console.log("landOwnerInfo items: ", landOwnerInfo.items);
    local_state.name = landOwnerInfo.items.name;
    local_state.gender = landOwnerInfo.items.gender;
    local_state.dob = landOwnerInfo.items.dob;
    local_state.address = landOwnerInfo.items.ownerAddress;
    local_state.nin = landOwnerInfo.items.NIN;
    local_state.phone1 = landOwnerInfo.items.phone1;
    local_state.phone2 = landOwnerInfo.items.phone2;
    local_state.email = landOwnerInfo.items.email;
    local_state.walletAddress = landOwnerInfo.items.wAddress;

    if(!view){
      Object.assign(ownerCompState, local_state);
    }

    // console.log("local_state_after mod: ", local_state)
  }


  const manageInputTag = () => {
      
    let elements = document.getElementsByTagName("input");
    
    // console.log("view: ", view); 

    // console.log("element: ", elements[0]);
    return view ? disableInputs(elements) : enableInputs(elements);;
  }

  const disableInputs = (elements) => {
    [...elements].forEach(element => {
      element.setAttribute("diasbled", true);
      // console.log("element: ", elements);
    });
  }

  const enableInputs = (elements) => {
    [...elements].forEach(element => {
      element.removeAttribute("diasbled")
      // console.log("element: ", elements);
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setlocal_state({ [name]: value });
    local_state[name] = value;
    ownerCompState[name] = value;
  }


  // manageInputTag();
  let elements = document.getElementsByTagName("input");

  const viewLayout = () => {
    console.log("local_state: ", local_state);
    return (
      <div className={classes.root} onLoad={manageInputTag}>
        <div className="container-fluid raised-box raised-box-theme">
          <p>Name:    <input type="text" className="form-control short-text-input-60" name="name" defaultValue={local_state.name} disabled  onChange={handleChange} /></p>
          <p>Gender:  <input type="text" className="form-control short-text-input-60" name="gender" value={local_state.gender} disabled onChange={handleChange} /></p>
          <p>DOB:     <input type="text" className="form-control short-text-input-60" name="dob" value={local_state.dob} disabled onChange={handleChange} /></p>
          <p>Address: <input type="text" className="form-control short-text-input-80" name="address" value={local_state.address} disabled onChange={handleChange} /></p>
          <p>Nin:     <input type="text" className="form-control short-text-input-60" name="nin" defaultValue={local_state.nin} disabled  onChange={handleChange} /></p>
          <p>Phone1:  <input type="text" className="form-control short-text-input-60" name="phone1" value={local_state.phone1} disabled onChange={handleChange} /></p>
          <p>Phone2:  <input type="text" className="form-control short-text-input-60" name="phone2" value={local_state.phone2} disabled onChange={handleChange} /></p>
          <p>Email:   <input type="text" className="form-control short-text-input-60" name="email" value={local_state.email} disabled onChange={handleChange} /></p>
          <p>Wallet Address: <input type="text" className="form-control short-text-input-80" name="walletAddress" value={local_state.walletAddress} disabled onChange={handleChange} /></p>
              
          </div>
      </div>
    );
  }

  const editLayout = () => {
    return (
      <div className={classes.root} onLoad={manageInputTag}>
        <div className="container-fluid raised-box raised-box-theme">
          <p>Name:    <input type="text" className="form-control short-text-input-60" name="name" defaultValue={local_state.name} onChange={handleChange} /></p>
          <p>Gender:  <input type="text" className="form-control short-text-input-40" name="gender" defaultValue={local_state.gender} onChange={handleChange} /> DOB:     
            <input type="text" className="form-control short-text-input-40" name="dob" defaultValue={local_state.dob} onChange={handleChange} /> </p>
          <p></p>
          <p>Address: <input type="text" className="form-control short-text-input-60" name="address" defaultValue={local_state.address} onChange={handleChange} /></p>
          <p>Nin: <input type="text" className="form-control short-text-input-80" name="nin" defaultValue={local_state.nin} onChange={handleChange} /></p>
          <p>Phone1:  <input type="text" className="form-control short-text-input-60" name="phone1" defaultValue={local_state.phone1} onChange={handleChange} /></p>
          <p>Phone2:  <input type="text" className="form-control short-text-input-60" name="phone2" defaultValue={local_state.phone2} onChange={handleChange} /></p>
          <p>Email:  <input type="text" className="form-control short-text-input-60" name="email" defaultValue={local_state.email} onChange={handleChange} /></p>
          <p>Wallet Address: <input type="text" className="form-control short-text-input-80" name="walletAddress" defaultValue={local_state.walletAddress} onChange={handleChange} /></p>
              
          </div>
      </div>
    );
  }

  const createLayout = () => {
    return (
      <div className={classes.root} onLoad={manageInputTag}>
        <div className="container-fluid raised-box raised-box-theme">
          <p>Name:    <input type="text" className="form-control short-text-input-60" name="name" placeholder=""  onChange={handleChange} /></p>
          <p>Gender:  <input type="text" className="form-control short-text-input-60" name="gender" placeholder="" onChange={handleChange} /></p>
          <p>DOB:     <input type="date" className="form-control short-text-input-60" name="dob" placeholder="" onChange={handleChange} /></p>
          <p>Address: <input type="text" className="form-control short-text-input-80" name="address" placeholder="" onChange={handleChange} /></p>
          <p>Nin: <input type="text" className="form-control short-text-input-80" name="nin" placeholder="" onChange={handleChange} /></p>
          <p>Phone1:  <input type="text" className="form-control short-text-input-60" name="phone1" placeholder="" onChange={handleChange} /></p>
          <p>Phone2:  <input type="text" className="form-control short-text-input-60" name="phone2" placeholder="" onChange={handleChange} /></p>
          <p>Email:  <input type="text" className="form-control short-text-input-60" name="email" placeholder="" onChange={handleChange} /></p>
          <p>Password: <input type="text" className="form-control short-text-input-80" name="password" placeholder="" onChange={handleChange} /></p>
              
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