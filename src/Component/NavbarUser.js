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
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
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
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AccountCircle from '@material-ui/icons/AccountCircle';
import EditIcon from '@material-ui/icons/Edit';
import LocalMallIcon from '@material-ui/icons/LocalMall';

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
    main: "#ffcb74",
  },
  secondary: {
    main: '#ffcb74',
  },
}));
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffcb74',
    },
    secondary: {
      main: '#ffcb74',
    },
  },
});

const NavbarUser = (props)=> {
  
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
                    history.push('/EditProfil/User')
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
        <MenuItem  onClick={() => history.push('/Cari/Produk')}><SearchIcon/>Cari Produk</MenuItem>          
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
        <MenuItem  onClick={() => history.push('/Keranjang')} ><AddShoppingCartIcon/>Keranjang ku</MenuItem>
        </IconButton>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
        <MenuItem  onClick={() => history.push('/Pembeli/Orderan')} ><LocalMallIcon/>Orderan ku</MenuItem>
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
          <Typography variant="h4" className={classes.judul} id= "judul" align = "left" style={{fontFamily:'Pacifico', color:"#ffffff"}}
          onClick={()=> history.push('/HalamanAwal')}>
           Sembako Go!
          </Typography>
          <div className={classes.root} />
          <div className={classes.sectionDesktop}>
            <Link  onClick={() => history.push('/Cari/Produk')} style={{color:'#ffffff'}}><SearchIcon/>Cari Produk</Link>
            <Link  onClick={() => history.push('/Keranjang')} style={{color:'#ffffff'}}><AddShoppingCartIcon/>Keranjang ku</Link>
            <Link  onClick={() => history.push('/Pembeli/Orderan')} style={{color:'#ffffff'}}><LocalMallIcon/>Orderan ku</Link>
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
export default withRouter(NavbarUser);