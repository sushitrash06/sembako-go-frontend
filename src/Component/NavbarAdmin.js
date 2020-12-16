import React from 'react';
//import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from 'react-bootstrap/NavLink';
//import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';
// import SearchIcon from '@material-ui/icons/Search';
// import InputBase from '@material-ui/core/InputBase';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';
import '../App.css';
import GroupIcon from '@material-ui/icons/Group';
import BlockIcon from '@material-ui/icons/Block';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
//import Masuk from '../Tampilan/LoginUser';

import { withRouter } from 'react-router-dom';
import history from '../history';
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
searchIcon: {
  marginTop:theme.spacing(-2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
},
inputRoot: {
  color: 'inherit',
},
inputInput: {
  padding: theme.spacing(1, 1, 0 , 0),
  // vertical padding + font size from searchIcon
  paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  transition: theme.transitions.create('width'),
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '25ch',
  },
},
  primary: {
    main: purple[500],
  },
  secondary: {
    main: '#ffcb74',
  },
}));
const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: '#ffcb74',
    },
  },
});

const NavbarAdmin = (props)=> {
  const classes = useStyles();
  return (
    <div>
    <ThemeProvider theme={theme} id="container">
    <div className={classes.root}>
      <AppBar 
      position="static" 
      color="secondary"
      id="app_bar"
      > 
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          */}
          <Typography variant="h4" className={classes.judul} id= "judul" align = "left" style={{fontFamily:'Carter One', color:"#ffffff", cursor:"pointer"}}
          onClick={()=> history.push('/AdminHome')}>
           Sembako Go!
          </Typography>
          <Link  onClick={() => history.push('/Terlarang')} style={{color:'#ffffff'}}>Produk Terlarang</Link>
          <Link  onClick={() => history.push('/Blokir')} style={{color:'#ffffff'}}>Produk diblokir</Link>
          <Link  onClick={() => history.push('/SemuaUser')} style={{color:'#ffffff'}}>Semua User</Link>
          <Link  onClick={()=>{
                    localStorage.removeItem("usertoken")
                    history.push('/')
                    }} style={{color:'#ffffff'}}>Logout</Link>
          
        </Toolbar>
      </AppBar>
    </div>
  </ThemeProvider>   
  </div>
  
  );
}
export default withRouter(NavbarAdmin);