import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import "./components.css"
import { useState } from 'react';
import { create } from 'ipfs-http-client';

import 'bootstrap/dist/css/bootstrap.min.css';

import {useDispatch, useSelector} from "react-redux"; 

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
}));

export default function RoCoComponent(props) {
  const classes = useStyles();
  const { view, create_view, rocoCompState } = props; 
  const [ file, setFile ] = useState("");
  const [ imagePreviewUrl, setImagePreviewUrl ] = useState("");

  const local_state = {
    rofoHash: "",
    rofoDate: 0,
    cofo: "",
    cofoDate: 0,
    coForm: "",
    coNature: "",
    certNumber: "",
    plotNumber: "",
    state: "",
    district: "",
    cadzone: "",
    stateOfAdmin: "",
    
  }

  // const client = create('https://ipfs.infura.io:5001/api/v0')
  const client = create();

  const dispatch = useDispatch();
  const landCertInfo = useSelector(state => state.landCert);
  const { user } = useSelector( state => state.authentication );

  if(landCertInfo.items && Object.keys(landCertInfo).length > 0){
    console.log("landCertInfo items: ", landCertInfo.items);
    local_state.rofoHash = landCertInfo.items.rofoHash ? landCertInfo.items.rofoHash : 0;
    local_state.rofoDate = landCertInfo.items.rofoDate ? landCertInfo.items.rofoDate : 0;
    local_state.cofo = landCertInfo.items.cofo ? landCertInfo.items.cofo : "";
    local_state.cofoDate = landCertInfo.items.cofoDate ? landCertInfo.items.cofoDate : 0;
    local_state.coForm = landCertInfo.items.coForm ? landCertInfo.items.coForm : "";
    local_state.coNature = landCertInfo.items.coNature ? landCertInfo.items.coNature : "";
    local_state.certNumber = landCertInfo.items.certNumber ? landCertInfo.items.certNumber : "";
    local_state.plotNumber = landCertInfo.items.plotNumber ? landCertInfo.items.plotNumber : "";

    if(!view){
      Object.assign(rocoCompState, local_state);
    }

    console.log("rocoCompState inside comp: ", rocoCompState, " local_state: ", local_state);
    
  }
  else {
    if(!view){
      Object.assign(rocoCompState, local_state);
    }
  }

  const handleSubmit = (e) => {
    e.prevenpefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', file);
  }

  const handleImageChange = (e) => {
    e.prevenpefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    console.log(e);

    reader.onloadend = () => {
      console.log(file);
      setFile(file);
      setImagePreviewUrl(reader.result);
    }

    reader.readAsDataURL(file)
  }

  let $imagePreview = null;
  if (imagePreviewUrl) {
    $imagePreview = (<img src={imagePreviewUrl} />);
  } else {
    $imagePreview = (<div className="previewText">No Image uploaded</div>);
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
    rocoCompState[name] = value;
  }


  manageInputTag();

  const viewLayout = () => {
    return (
      <div className={classes.root}>
        <div className="container-fluid raised-box raised-box-theme">
            <p>LofI/CofO/RofO Details</p>
          <div className="row">
              <div className="col-sm-12 col-md-6">
                <p>RofO:<input type="text" className="form-control short-text-input-80" name="rofoHash" value={local_state.rofoHash} disabled onChange={handleChange} /></p>
                <p>RofO Date: <input type="text" className="form-control short-text-input-80" name="rofoDate" value={local_state.rofoDate} disabled onChange={handleChange} /></p>
                <p>CofO: <input type="text" className="form-control short-text-input-80" name="cofo" value={local_state.cofo} disabled onChange={handleChange} /></p>
                <p>CofO Date: <input type="text" className="form-control short-text-input-80" name="cofoDate" value={local_state.cofoDate} disabled onChange={handleChange} /></p>
                <p>CofO Form: <input type="text" className="form-control short-text-input-80" name="coForm" value={local_state.coForm} disabled onChange={handleChange} /></p>
                <p>Nature: <input type="text" className="form-control short-text-input-80" name="coNature" value={local_state.coNature} disabled onChange={handleChange} /></p>
                <p>Cert Number: <input type="text" className="form-control" name="certNumber" value={local_state.certNumber} disabled onChange={handleChange} /></p>
                
                  
              </div>
              
          </div>
          <div className="row">
            <div className="col-sm-2 imgUp"> 
              <div className="imagePreview img-responsive">
                {$imagePreview}
              </div>
            </div>
          </div>
            
        </div>
      </div>
  
    )
  }

  const editLayout = () => {
    return (
      <div className={classes.root}>
        <div className="container-fluid raised-box raised-box-theme">
            <p>LofI/CofO/RofO Details</p>
          <div className="row">
              <div className="col-md-6">
                <p>RofO:<input type="text" className="form-control short-text-input-80" name="rofoHash" defaultValue={local_state.rofoHash} onChange={handleChange} /></p>
                <p>RofO Date: <input type="text" className="form-control short-text-input-80" name="rofoDate" defaultValue={local_state.rofoDate} onChange={handleChange} /></p>
                <p>CofO: <input type="text" className="form-control short-text-input-80" name="cofo" defaultValue={local_state.cofo} onChange={handleChange} /></p>
                <p>CofO Date: <input type="text" className="form-control short-text-input-80" name="cofoDate" defaultValue={local_state.cofoDate} onChange={handleChange} /></p>
                <p>CofO Form: <input type="text" className="form-control short-text-input-80" name="coForm" defaultValue={local_state.coForm} onChange={handleChange} /></p>
                <p>Nature: <input type="text" className="form-control short-text-input-80" name="coNature" defaultValue={local_state.coNature} onChange={handleChange} /></p>
                <p>Cert Number: <input type="text" className="form-control" name="certNumber" defaultValue={local_state.certNumber} onChange={handleChange} /></p>     
              </div>
              <div className="row">
                <div className="col-sm-2 imgUp">                
                  <form onSubmit={(e)=>handleSubmit(e)}>
                    <input className="fileInput btn btn-secondary my-1 mb-1" 
                      type="file" 
                      onChange={(e)=>handleImageChange(e)} />
                    <button className="submitButton btn btn-primary my-1 mb-2" 
                      type="submit" 
                      onClick={(e)=>handleSubmit(e)}>Upload Image</button>
                  </form>
                  <div className="imagePreview img-responsive">
                    {$imagePreview}
                  </div>
                </div>
              </div>
          
          </div>
            
        </div>
      </div>
  

    )

  }

  const createLayout = () => {
    return (
      <div className={classes.root}>
        <div className="container-fluid raised-box raised-box-theme">
        <p>Land of Interest</p>
          <div className="row">
              <div className="col-md-12 col-sm-12">
                <p>State: <input type="text" className="form-control short-text-input-60" name="state" placeholder={"state"} onChange={handleChange} /></p>
                <p>District: <input type="text" className="form-control short-text-input-60" name="district" placeholder={"district"} onChange={handleChange} /></p>
                <p>Cadzone: <input type="text" className="form-control short-text-input-60" name="cadzone" placeholder={"cadzone"} onChange={handleChange} /></p>
                <p>Plot Number: <input type="text" className="form-control short-text-input-60" name="plotNumber" placeholder={"plotNumber"} onChange={handleChange} /></p>
              </div>
              
          </div>
          <p>LofI/CofO/RofO Details</p>
          <div className="row">
              <div className="col-md-12 col-sm-12">
                <p>RofO:<input type="text" className="form-control" name="rofoHash"  onChange={handleChange} /></p>
                <p>RofO Date: <input type="date" className="form-control short-text-input-80" name="rofoDate" onChange={handleChange} /></p>
                <p>CofO: <input type="text" className="form-control short-text-input-80" name="cofo" onChange={handleChange} /></p>
                <p>CofO Date: <input type="date" className="form-control short-text-input-80" name="cofoDate" onChange={handleChange} /></p>
                <p>CofO Form: <input type="text" className="form-control short-text-input-80" name="coForm" onChange={handleChange} /></p>
                <p>Nature: <input type="text" className="form-control short-text-input-80" name="coNature" onChange={handleChange} /></p>
                <p>Cert Number: <input type="text" className="form-control" name="certNumber" onChange={handleChange} /></p>       
              </div>
          <p>Admin</p>
          <p>State of admin: <input type="text" className="form-control short-text-input-60" name="stateOfAdmin" onChange={handleChange} /></p>
              
          </div>
          <div className="row d-flex justify-content-center">
            <div className="col-sm-2 imgUp">                
              <form onSubmit={(e)=>handleSubmit(e)}>
                <input className="fileInput btn btn-secondary my-1 mb-1" 
                  type="file" 
                  onChange={(e)=>handleImageChange(e)} />
                <button className="submitButton btn btn-primary my-1 mb-2" 
                  type="submit" 
                  onClick={(e)=>handleSubmit(e)}>Upload Image</button>
              </form>
              <div className="imagePreview img-responsive">
                {$imagePreview}
              </div>
            </div>
          </div>
            
        </div>
      </div>

    )

  }


  return (
    create_view ? createLayout() : view ? viewLayout() : editLayout()
    );
}

function mapStateToProps(state) {
  const { loggingIn } = state;

    return {
      loggingIn,
    };
}

const connectedRoCoComponent = connect(mapStateToProps)(RoCoComponent);
export { connectedRoCoComponent as RoCoComponent }; 