import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CariProduk from './cariproduk';
import CariUser from './CariUser';
import CariToko from './CariToko';
import CariLokasi from './CariUserByKota';
import Navbar from '../../Component/NavbarUser';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import StoreIcon from '@material-ui/icons/Store';
import LocationOnIcon from '@material-ui/icons/LocationOn';

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
        <Box p={4}>
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
    width: '100%',
    flexGrow: 1,
  },
}));

export default function TabCari() {
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
          indicatorColor="secondary"
          variant="fullWidth"
          aria-label="icon label tabs example"
        >
          <Tab icon={<ShoppingCartIcon/>} label="Cari Produk" {...a11yProps(0)} />
          <Tab icon={<PersonIcon/>} label="Cari Username" {...a11yProps(1)} />
          <Tab icon={<StoreIcon/>} label="Cari Toko" {...a11yProps(2)} />
          <Tab icon={<LocationOnIcon/>} label="Cari Lokasi" {...a11yProps(3)} />
        </Tabs>
      </AppBar> 
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <CariProduk/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <CariUser/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <CariToko/>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <CariLokasi/>
        </TabPanel>
      </SwipeableViews>
    </div>
    </div>
  );
}
