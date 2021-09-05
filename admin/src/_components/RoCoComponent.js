import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import "./components.css"
import { useState } from 'react';
import { create } from 'ipfs-http-client'

import {useDispatch, useSelector} from "react-redux"; 

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
}));

export default function OwnerComponent(props) {
  const classes = useStyles();
  const { view, create_view, rocoCompState } = props; 
  const [ file, setFile ] = useState("");
  const [ imagePreviewUrl, setImagePreviewUrl ] = useState("");
  // const { rocoCompState } = props;

  const local_state = {
    rofoHash: "",
    rofoDate: "",
    cofo: "",
    cofoDate: "",
    coForm: "",
    coNature: "",
    certNumber: ""
    
  }

  // const client = create('https://ipfs.infura.io:5001/api/v0')
  const client = create();

  const dispatch = useDispatch();
  const landCertInfo = useSelector(state => state.landCert);

  if(landCertInfo.items && Object.keys(landCertInfo).length > 0){
    console.log("landCertInfo items: ", landCertInfo.items);
    local_state.rofoHash = landCertInfo.items.rofoHash;
    local_state.rofoDate = landCertInfo.items.rofoDate;
    local_state.cofo = landCertInfo.items.cofo;
    local_state.cofoDate = landCertInfo.items.cofoDate;
    local_state.coForm = landCertInfo.items.coForm ? landCertInfo.items.coForm : "";
    local_state.coNature = landCertInfo.items.coNature ? landCertInfo.items.coNature : "";
    local_state.certNumber = landCertInfo.items.certNumber;

    if(!view){
      Object.assign(rocoCompState, local_state);
    }

    console.log("rocoCompState inside comp: ", rocoCompState, " local_state: ", local_state);
    
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', file);
  }

  const handleImageChange = (e) => {
    e.preventDefault();

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
              <div className="col-md-6">
                  <table className="table table-borderless">                      
                      <tbody>
                          <tr>
                          <td>RofO:<input type="text" className="form-control short-text-input-80" name="rofoHash" value={local_state.rofoHash} disabled onChange={handleChange} /></td>
                          <td>RofO Date: <input type="text" className="form-control short-text-input-80" name="rofoDate" value={local_state.rofoDate} disabled onChange={handleChange} /></td>
                          </tr>
                          <tr>
                          <td>CofO: <input type="text" className="form-control short-text-input-80" name="cofo" value={local_state.cofo} disabled onChange={handleChange} /></td>
                          <td>CofO Date: <input type="text" className="form-control short-text-input-80" name="cofoDate" value={local_state.cofoDate} disabled onChange={handleChange} /></td>
                          </tr>
                          <tr>
                          <td>CofO Form: <input type="text" className="form-control short-text-input-80" name="coForm" value={local_state.coForm} disabled onChange={handleChange} /></td>
                          <td>Nature: <input type="text" className="form-control short-text-input-80" name="coNature" value={local_state.coNature} disabled onChange={handleChange} /></td>
                          </tr>
                          <tr>
                              <td>Cert Number: <input type="text" className="form-control" name="certNumber" value={local_state.certNumber} disabled onChange={handleChange} /></td>
                          </tr>

                      </tbody>
                  </table>
              </div>
              <div className="vertical-line" />
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
                  <table className="table table-borderless">
                      
                      <tbody>
                          <tr>
                          <td>RofO:<input type="text" className="form-control short-text-input-80" name="rofoHash" defaultValue={local_state.rofoHash} onChange={handleChange} /></td>
                          <td>RofO Date: <input type="text" className="form-control short-text-input-80" name="rofoDate" defaultValue={local_state.rofoDate} onChange={handleChange} /></td>
                          </tr>
                          <tr>
                          <td>CofO: <input type="text" className="form-control short-text-input-80" name="cofo" defaultValue={local_state.cofo} onChange={handleChange} /></td>
                          <td>CofO Date: <input type="text" className="form-control short-text-input-80" name="cofoDate" defaultValue={local_state.cofoDate} onChange={handleChange} /></td>
                          </tr>
                          <tr>
                          <td>CofO Form: <input type="text" className="form-control short-text-input-80" name="coForm" defaultValue={local_state.coForm} onChange={handleChange} /></td>
                          <td>Nature: <input type="text" className="form-control short-text-input-80" name="coNature" defaultValue={local_state.coNature} onChange={handleChange} /></td>
                          </tr>
                          <tr>
                              <td>Cert Number: <input type="text" className="form-control" name="certNumber" defaultValue={local_state.certNumber} onChange={handleChange} /></td>
                          </tr>

                      </tbody>
                  </table>
              </div>
              <div className="vertical-line" />
              <div className="col-md-6 imgUp">                
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

  const createLayout = () => {
    return (
      <div className={classes.root}>
        <div className="container-fluid raised-box raised-box-theme">
            <p>LofI/CofO/RofO Details</p>
          <div className="row">
              <div className="col-md-6">
                  <table className="table table-borderless">
                      
                      <tbody>
                          <tr>
                          <td>RofO:<input type="text" className="form-control short-text-input-80" name="rofoHash"  onChange={handleChange} /></td>
                          <td>RofO Date: <input type="date" className="form-control short-text-input-80" name="rofoDate" onChange={handleChange} /></td>
                          </tr>
                          <tr>
                          <td>CofO: <input type="text" className="form-control short-text-input-80" name="cofo" onChange={handleChange} /></td>
                          <td>CofO Date: <input type="date" className="form-control short-text-input-80" name="cofoDate" onChange={handleChange} /></td>
                          </tr>
                          <tr>
                          <td>CofO Form: <input type="text" className="form-control short-text-input-80" name="coForm" onChange={handleChange} /></td>
                          <td>Nature: <input type="text" className="form-control short-text-input-80" name="coNature" onChange={handleChange} /></td>
                          </tr>
                          <tr>
                              <td>Cert Number: <input type="text" className="form-control" name="certNumber" onChange={handleChange} /></td>
                          </tr>

                      </tbody>
                  </table>
              </div>
              <div className="vertical-line" />
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
    create_view? createLayout() : view ? viewLayout() : editLayout()
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