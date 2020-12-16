import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Orderan from './Order';
import OrderTerkirim from './OrderTerkirim';
import OrderBelumTerkirim from './OrderBelumTerkirim';
import Navbar from '../../Component/NavbarPenjual';

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
          <Typography>{children}</Typography>
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div>
        <Navbar/>
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor:"#ea907a"}} >
        <Tabs
          value={value}
          onChange={handleChange} 
          value={value}
          onChange={handleChange} 
          indicatorColor="secondary"
          variant="fullWidth"
          aria-label="icon label tabs example"
        >
          <Tab label="Semua Orderan" {...a11yProps(0)} />
          <Tab label="Orderan Terkirim" {...a11yProps(1)} />
          <Tab label="Orderan Belum Terkirim" {...a11yProps(2)} />
        </Tabs>
      </AppBar> 
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Orderan/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <OrderTerkirim/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <OrderBelumTerkirim/>
        </TabPanel>
      </SwipeableViews>
    </div>
    </div>
  );
}
