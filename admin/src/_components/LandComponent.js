import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import "./components.css"

import {useDispatch, useSelector} from "react-redux"; 


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
}));

export default function LandComponent(props) {
  const classes = useStyles();
  const { view, create, landCompState } = props;  

  const local_state = {
    state: "",
    district: "",
    cadzone: "",
    plotNumber: "",
    plotSize: "",
    owner: "",
    status: "",
    lastModified: "",
    WalletAddress: ""
    
  }

  const dispatch = useDispatch();
  const landInfo = useSelector(state => state.landData); 

  console.log("landInfo component: ", landInfo );

  if(landInfo.items && Object.keys(landInfo).length > 0){
    console.log("landInfo items: ", landInfo.items);
    local_state.state = landInfo.items.land_info.state;
    local_state.district = landInfo.items.land_info.district;
    local_state.cadzone = landInfo.items.land_info.cadzone;
    local_state.plotNumber = landInfo.items.land_info.plotNumber;
    local_state.plotSize = landInfo.items.land_info.plotSize;
    local_state.owner = landInfo.items.land_info.currentOwner;
    local_state.status = landInfo.items.land_info.isCertified ? "certified" : "uncertified";
    local_state.lastModified = landInfo.items.land_info.lastModified;
    local_state.WalletAddress = landInfo.items.land_info.currentOwner;

    console.log("local_state_after mod: ", local_state)
    if(!view){
      Object.assign(landCompState, local_state);
    }

    // console.log("landCompState inside comp: ", landCompState);
  }


  const manageInputTag = () => {
      
    let elements = document.getElementsByTagName("input");
    if(elements.length < 2){
        return;
    }
    [...elements].forEach(element => {
        element.readOnly = view;
    });
      
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setState({ [name]: value });
    local_state[name] = value;
    landCompState[name] = value;
  }

  manageInputTag();

  const viewLayout = () => {
    return (
      <div className={classes.root}>
        <div className="container-fluid raised-box raised-box-theme">
          <p>State: <input type="text" className="form-control short-text-input-60" name="state" value={local_state.state} disabled onChange={handleChange} /></p>
          <p>District: <input type="text" className="form-control short-text-input-60" name="district" value={local_state.district} disabled onChange={handleChange} /></p>
          <p>Cadzone: <input type="text" className="form-control short-text-input-60" name="cadzone" value={local_state.cadzone} disabled onChange={handleChange} /></p>
          <p>Plot Number: <input type="text" className="form-control short-text-input-60" name="plotNumber" value={local_state.plotNumber} disabled onChange={handleChange} /></p>
          <p>Plot Size: <input type="text" className="form-control short-text-input-80" name="plotSize" value={local_state.plotSize} disabled onChange={handleChange} /></p>
          <p>Owner: <input type="text" className="form-control short-text-input-60" name="owner" value={local_state.owner} disabled onChange={handleChange} /></p>
          <p>Status: <input type="text" className="form-control short-text-input-60" name="status" value={local_state.status} disabled onChange={handleChange} /></p>
          {/* <p>Last Modified: <input type="text" className="form-control short-text-input-60" name="lastModified" value={local_state.lastModified} disabled onChange={handleChange} /></p> */}
              
          </div>
      </div>
    )
  }

  const editLayout = () => {
    return (
      <div className={classes.root}>
        <div className="container-fluid raised-box raised-box-theme">
          <p>State: <input type="text" className="form-control short-text-input-60" name="state" defaultValue={local_state.state} onChange={handleChange} /></p>
          <p>District: <input type="text" className="form-control short-text-input-60" name="district" defaultValue={local_state.district} onChange={handleChange} /></p>
          <p>Cadzone: <input type="text" className="form-control short-text-input-60" name="cadzone" defaultValue={local_state.cadzone} onChange={handleChange} /></p>
          <p>Plot Number: <input type="text" className="form-control short-text-input-60" name="plotNumber" defaultValue={local_state.plotNumber} onChange={handleChange} /></p>
          <p>Plot Size: <input type="text" className="form-control short-text-input-80" name="plotSize" defaultValue={local_state.plotSize} onChange={handleChange} /></p>
          <p>Owner: <input type="text" className="form-control short-text-input-60" name="owner" defaultValue={local_state.owner} onChange={handleChange} /></p>
          <p>Status: <input type="text" className="form-control short-text-input-60" name="status" defaultValue={local_state.status} onChange={handleChange} /></p>
          {/* <p>Last Modified: <input type="text" className="form-control short-text-input-60" name="lastModified" defaultValue={local_state.lastModified} onChange={handleChange} /></p> */}
              
          </div>
      </div>
    )

  }

  const createLayout = () => {
    return (
      <div className={classes.root}>
        <div className="container-fluid raised-box raised-box-theme">
          <p>State: <input type="text" className="form-control short-text-input-60" name="state" placeholder={local_state.state} onChange={handleChange} /></p>
          <p>District: <input type="text" className="form-control short-text-input-60" name="district" placeholder={local_state.district} onChange={handleChange} /></p>
          <p>Cadzone: <input type="text" className="form-control short-text-input-60" name="cadzone" placeholder={local_state.cadzone} onChange={handleChange} /></p>
          <p>Plot Number: <input type="text" className="form-control short-text-input-60" name="plotNumber" placeholder={local_state.plotNumber} onChange={handleChange} /></p>
          <p>Plot Size: <input type="text" className="form-control short-text-input-80" name="plotSize" placeholder={local_state.plotSize} onChange={handleChange} /></p>
          <p>Owner: <input type="text" className="form-control short-text-input-60" name="owner" placeholder={local_state.owner} onChange={handleChange} /></p>
          <p>Status: <input type="text" className="form-control short-text-input-60" name="status" placeholder={local_state.status} onChange={handleChange} /></p>
          {/* <p>Last Modified: <input type="text" className="form-control short-text-input-60" name="lastModified" placeholder={local_state.lastModified} onChange={handleChange} /></p> */}
              
          </div>
      </div>
    )
  }

  return (
    create ? createLayout() : view ? viewLayout() : editLayout()
  );
}


function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLandComponent = connect(mapStateToProps)(LandComponent);
export { connectedLandComponent as LandComponent }; 