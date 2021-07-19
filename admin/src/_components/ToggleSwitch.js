import React from 'react';
import { connect } from 'react-redux';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function ToggleSwitch(props) {
  const [state, setState] = React.useState({
    checked: true,
    label: "land"
  });
  const { statevar } = props;

  const handleChange = (event) => {
    const checkedState = event.target.checked;
    setState({ ...state, [event.target.name]: checkedState, label:  checkedState ? "land" : "user"}); // Are we searching with user info or land?
    // console.log(typeof(set_search_type_is_land));
    statevar.search_type_is_land = checkedState;
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={<Switch checked={state.checked} onChange={handleChange} name="checked" />}
        label={statevar.search_type_is_land ? "land" : "user"}
      />
    </FormGroup>
  );
}


function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedToggleSwitch = connect(mapStateToProps)(ToggleSwitch);
export { connectedToggleSwitch as ToggleSwitch }; 