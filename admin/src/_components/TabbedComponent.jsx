import React from 'react';

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';

import OwnerComponent from '../_components/OwnerComponent';
import LandComponent from '../_components/LandComponent';
import RoCoComponent from '../_components/RoCoComponent';

import { landActions } from '../_actions/land.actions';

import {useDispatch, useSelector} from "react-redux"; 

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
  },
}));

export default function FullWidthTabs() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const dispatch = useDispatch();

  const ownerCompState = {};
    const landCompState = {};
    const rocoCompState = {};


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleSubmitClicked = () => {
    const formState = {ownerCompState: ownerCompState, landCompState: landCompState, rocoCompState: rocoCompState}
    console.log("Tabbed foemstate: ", formState);
    if(value == 0)  {
        dispatch(landActions.apply_application_submitted(ownerCompState));
    }
    else if(value == 1) dispatch(landActions.apply_allocation_submitted(landCompState));
    else if(value == 2) dispatch(landActions.apply_certification_submitted(rocoCompState));
    // this.props.dispatch(landActions.apply_details_submitted(formState));
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default"> 
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Application" {...a11yProps(0)} />l=
          <Tab label="Allocation" {...a11yProps(1)} />
          <Tab label="Certification" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <OwnerComponent create_view={true}  ownerCompState={ownerCompState} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <LandComponent create_view={true}  landCompState={landCompState} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <RoCoComponent create_view={true}  rocoCompState={rocoCompState} />
        </TabPanel>
      </SwipeableViews>
      <div className="d-flex justify-content-center">
        <Button variant="contained" color="primary" onClick={handleSubmitClicked}  >
            Submit
        </Button>
      </div>
    </div>
  );
}
