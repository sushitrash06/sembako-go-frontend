import React from 'react';
//import ReactDOM from 'react-dom';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from 'react-bootstrap/NavLink';
//import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';
import '../App.css';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
//import Masuk from '../Tampilan/LoginUser';
import { withRouter } from 'react-router-dom';
import history from '../history';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import StorefrontIcon from '@material-ui/icons/Storefront';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
//import Navbar from 'react-bootstrap';
//import Routes from '../Router';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  judul: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      pointerEvents:'auto',
      
  },
},
sectionDesktop:{
  display: 'none',
  [theme.breakpoints.up('md')]:{
    display:'flex'
  },
},
sectionMobile:{
  display:'flex',
  [theme.breakpoints.up('md')]:{
    display:'none'
  },
},
  primary: {
    main: purple[500],
  },
  secondary: {
    main: '#96d6b1',
  },
}));
const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: '#96d6b1',
    },
  },
});

const NavbarPenjual = (props)=> {
  const classes = useStyles();
  const [anchorEl,setAnchorEl]= React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
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
      <MenuItem  onClick={()=>{
                    handleMenuClose();
                    history.push('/ProfilePenjual')
                    }}><PersonOutlineOutlinedIcon/>Profile</MenuItem>
      <MenuItem  onClick={()=>{
                    handleMenuClose();
                    history.push('/Penjual/EditProfil')
                    }}><EditIcon/>Edit Profil</MenuItem>              
      <MenuItem onClick={()=>{
                    localStorage.removeItem("usertoken")
                    handleMenuClose();
                    history.push('/')
                    }}><ExitToAppIcon/>Logout</MenuItem>
    </Menu>
  );
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
        <MenuItem  onClick={() => history.push('/EditProduk')}><StorefrontIcon/>Produk ku</MenuItem>          
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
        <MenuItem  onClick={() => history.push('/Orderan')} ><ShoppingCartIcon/>Orderan ku</MenuItem>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div>
    <ThemeProvider theme={theme} id="container">
    <div className={classes.root}>
      <AppBar 
      position="static" 
      color="secondary"
      id="app_bar"
      style={{backgroundColor:'#ffcb74'}}
      >
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          */}
          <Typography variant="h4" id= "judul" align = "left" style={{fontFamily:'Pacifico', color:"#ffffff"}}
          onClick={()=> history.push('/DashboardPenjual')}>
           Sembako Go!
          </Typography>
          <div className={classes.root} />
          <div className={classes.sectionDesktop}>
            <Link  onClick={() => history.push('/EditProduk')} style={{color:'#ffffff'}}><StorefrontIcon/>Produk ku</Link>
            <Link  onClick={() => history.push('/Orderan')} style={{color:'#ffffff'}}><ShoppingCartIcon/>Orderan ku</Link>
            <Link  onClick={handleProfileMenuOpen} style={{color:'#ffffff'}}><AccountCircle/>User</Link>
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
    </div>
  </ThemeProvider>
  {renderMobileMenu}
  {renderMenu}
  </div>
  
  );
}
export default withRouter(NavbarPenjual);