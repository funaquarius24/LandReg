import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import "./components.css"
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
}));

export default function OwnerComponent(props) {
  const classes = useStyles();
  const { view, create } = props; 
  const [ file, setFile ] = useState("");
  const [ imagePreviewUrl, setImagePreviewUrl ] = useState("");

  const state = {
    roStat: "",
    roDate: "",
    coStat: "",
    coDate: "",
    coForm: "",
    coNature: "",
    certno: ""
    
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
    state[name] = value;
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
                          <td>RofO Status:<input type="text" className="form-control short-text-input-80" name="roStat" value="test" disabled onChange={handleChange} /></td>
                          <td>RofO Date: <input type="text" className="form-control short-text-input-80" name="roDate" value="test" disabled onChange={handleChange} /></td>
                          </tr>
                          <tr>
                          <td>CofO Status: <input type="text" className="form-control short-text-input-80" name="coStat" value="test" disabled onChange={handleChange} /></td>
                          <td>CofO Date: <input type="text" className="form-control short-text-input-80" name="coDate" value="test" disabled onChange={handleChange} /></td>
                          </tr>
                          <tr>
                          <td>CofO Form: <input type="text" className="form-control short-text-input-80" name="coForm" value="test" disabled onChange={handleChange} /></td>
                          <td>Nature: <input type="text" className="form-control short-text-input-80" name="coNature" value="test" disabled onChange={handleChange} /></td>
                          </tr>
                          <tr>
                              <td>Cert Number: <input type="text" className="form-control" name="certno" value="test" disabled onChange={handleChange} /></td>
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
                          <td>RofO Status:<input type="text" className="form-control short-text-input-80" name="roStat" defaultValue="test" onChange={handleChange} /></td>
                          <td>RofO Date: <input type="text" className="form-control short-text-input-80" name="roDate" defaultValue="test" onChange={handleChange} /></td>
                          </tr>
                          <tr>
                          <td>CofO Status: <input type="text" className="form-control short-text-input-80" name="coStat" defaultValue="test" onChange={handleChange} /></td>
                          <td>CofO Date: <input type="text" className="form-control short-text-input-80" name="coDate" defaultValue="test" onChange={handleChange} /></td>
                          </tr>
                          <tr>
                          <td>CofO Form: <input type="text" className="form-control short-text-input-80" name="coForm" defaultValue="test" onChange={handleChange} /></td>
                          <td>Nature: <input type="text" className="form-control short-text-input-80" name="coNature" defaultValue="test" onChange={handleChange} /></td>
                          </tr>
                          <tr>
                              <td>Cert Number: <input type="text" className="form-control" name="certno" defaultValue="test" onChange={handleChange} /></td>
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
                          <td>RofO Status:<input type="text" className="form-control short-text-input-80" name="roStat"  onChange={handleChange} /></td>
                          <td>RofO Date: <input type="date" className="form-control short-text-input-80" name="roDate" onChange={handleChange} /></td>
                          </tr>
                          <tr>
                          <td>CofO Status: <input type="text" className="form-control short-text-input-80" name="coStat" onChange={handleChange} /></td>
                          <td>CofO Date: <input type="date" className="form-control short-text-input-80" name="coDate" onChange={handleChange} /></td>
                          </tr>
                          <tr>
                          <td>CofO Form: <input type="text" className="form-control short-text-input-80" name="coForm" onChange={handleChange} /></td>
                          <td>Nature: <input type="text" className="form-control short-text-input-80" name="coNature" onChange={handleChange} /></td>
                          </tr>
                          <tr>
                              <td>Cert Number: <input type="text" className="form-control" name="certno" onChange={handleChange} /></td>
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