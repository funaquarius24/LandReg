import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import "./components.css"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
}));

export default function LandComponent(props) {
  const classes = useStyles();
  const { view, create } = props;  

  const state = {
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
    state[name] = value;
  }


  manageInputTag();

  const viewLayout = () => {
    return (
      <div className={classes.root}>
        <div className="container-fluid raised-box raised-box-theme">
          <p>State: <input type="text" className="form-control short-text-input-60" name="state" value="test" disabled onChange={handleChange} /></p>
          <p>District: <input type="text" className="form-control short-text-input-60" name="district" value="test" disabled onChange={handleChange} /></p>
          <p>Cadzone: <input type="text" className="form-control short-text-input-60" name="cadzone" value="test" disabled onChange={handleChange} /></p>
          <p>Plot Number: <input type="text" className="form-control short-text-input-60" name="plotNumber" value="test" disabled onChange={handleChange} /></p>
          <p>Plot Size: <input type="text" className="form-control short-text-input-80" name="plotSize" value="test" disabled onChange={handleChange} /></p>
          <p>Owner: <input type="text" className="form-control short-text-input-60" name="owner" value="test" disabled onChange={handleChange} /></p>
          <p>Status: <input type="text" className="form-control short-text-input-60" name="status" value="test" disabled onChange={handleChange} /></p>
          <p>Last Modified: <input type="text" className="form-control short-text-input-60" name="lastModified" value="test" disabled onChange={handleChange} /></p>
              
          </div>
      </div>
    )
  }

  const editLayout = () => {
    return (
      <div className={classes.root}>
        <div className="container-fluid raised-box raised-box-theme">
          <p>State: <input type="text" className="form-control short-text-input-60" name="state" defaultValue="test" onChange={handleChange} /></p>
          <p>District: <input type="text" className="form-control short-text-input-60" name="district" defaultValue="test" onChange={handleChange} /></p>
          <p>Cadzone: <input type="text" className="form-control short-text-input-60" name="cadzone" defaultValue="test" onChange={handleChange} /></p>
          <p>Plot Number: <input type="text" className="form-control short-text-input-60" name="plotNumber" defaultValue="test" onChange={handleChange} /></p>
          <p>Plot Size: <input type="text" className="form-control short-text-input-80" name="plotSize" defaultValue="test" onChange={handleChange} /></p>
          <p>Owner: <input type="text" className="form-control short-text-input-60" name="owner" defaultValue="test" onChange={handleChange} /></p>
          <p>Status: <input type="text" className="form-control short-text-input-60" name="status" defaultValue="test" onChange={handleChange} /></p>
          <p>Last Modified: <input type="text" className="form-control short-text-input-60" name="lastModified" defaultValue="test" onChange={handleChange} /></p>
              
          </div>
      </div>
    )

  }

  const createLayout = () => {
    return (
      <div className={classes.root}>
        <div className="container-fluid raised-box raised-box-theme">
          <p>State: <input type="text" className="form-control short-text-input-60" name="state" placeholder="test" onChange={handleChange} /></p>
          <p>District: <input type="text" className="form-control short-text-input-60" name="district" placeholder="test" onChange={handleChange} /></p>
          <p>Cadzone: <input type="text" className="form-control short-text-input-60" name="cadzone" placeholder="test" onChange={handleChange} /></p>
          <p>Plot Number: <input type="text" className="form-control short-text-input-60" name="plotNumber" placeholder="test" onChange={handleChange} /></p>
          <p>Plot Size: <input type="text" className="form-control short-text-input-80" name="plotSize" placeholder="test" onChange={handleChange} /></p>
          <p>Owner: <input type="text" className="form-control short-text-input-60" name="owner" placeholder="test" onChange={handleChange} /></p>
          <p>Status: <input type="text" className="form-control short-text-input-60" name="status" placeholder="test" onChange={handleChange} /></p>
          <p>Last Modified: <input type="text" className="form-control short-text-input-60" name="lastModified" placeholder="test" onChange={handleChange} /></p>
              
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