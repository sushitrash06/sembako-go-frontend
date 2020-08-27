import React from 'react';
//import ReactDOM from 'react-dom';
import {makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';
//import SearchIcon from '@material-ui/icons/Search';
//import InputBase from '@material-ui/core/InputBase';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';
import '../App.css';
import MenuItem from '@material-ui/core/MenuItem';
import {BrowserRouter as Router} from 'react-router-dom';
//import Masuk from '../Tampilan/LoginUser';
import { withRouter } from 'react-router-dom';
import history from '../history';
import Routes from '../Router';
import Menu from '@material-ui/core/Menu';
//import Navbar from 'react-bootstrap';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme)=>({
  grow:{
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]:{
      display: 'block',
    },
  },
sectionDesktop:{
  display: 'none',
  [theme.breakpoints.up('md')]:{
    display:'flex',
  },
},
sectionMobile: {
  display: 'flex',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
},
}));
const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});
export default function NavbarPenjual() {

  const classes=useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl,setMobileMoreAnchorEl]=React.useState(null);

  const isMenuOpen= Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event)=>{
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () =>{
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose=()=>{
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) =>{
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Edit Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Riwayat Transaksi</MenuItem>
      <MenuItem onClick={handleMenuClose}>Daftar Produk</MenuItem>
      <MenuItem onClick={()=>{
                    localStorage.removeItem("usertoken")
                    history.push('/')}}>Log Out</MenuItem>
    </Menu>
  );
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal:'right'}}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton 
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle/>
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );


  return(
  <div>
    <Router>
      <ThemeProvider theme={theme} id="container">
        <div className={classes.root}>
          <AppBar
          position="static"
          color="secondary"
          id="app_bar"
          >
            <Toolbar>
              <Typography variant="h4" noWrap className={classes.judul} style={{fontFamily:'Pacifico'}}>
                Sembako Go!
              </Typography>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
              <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </div>
      </ThemeProvider>
    </Router>
  </div>
  );
}
