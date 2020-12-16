import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SemuaOrderan from './SemuaOrderan';
import OrderBelumDikirim from './OrderanBelumSlesai';
import OrderanDikirim from './OrderDikirim';
import OrderanDiterima from './OrderanSelsai';
import Navbar from '../../Component/NavbarUser';

function TabPanelOrder(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="TabPanelOrder"
      hidden={value !== index}
      id={`full-width-TabPanelOrder-${index}`}
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

TabPanelOrder.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-TabPanelOrder-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
  },
}));

export default function TabOrder() {
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
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Semua Orderan" {...a11yProps(0)} />
          <Tab label="Orderan Belum dikirim" {...a11yProps(1)} />
          <Tab label="Orderan dikirim" {...a11yProps(2)} />
          <Tab label="Orderan diterima" {...a11yProps(3)} />
        </Tabs>
      </AppBar> 
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanelOrder value={value} index={0} dir={theme.direction}>
          <SemuaOrderan/>
        </TabPanelOrder>
        <TabPanelOrder value={value} index={1} dir={theme.direction}>
          <OrderBelumDikirim/>
        </TabPanelOrder>
        <TabPanelOrder value={value} index={2} dir={theme.direction}>
          <OrderanDikirim/>
        </TabPanelOrder>
        <TabPanelOrder value={value} index={3} dir={theme.direction}>
          <OrderanDiterima/>
        </TabPanelOrder>
      </SwipeableViews>
    </div>
    </div>
  );
}
