import React from 'react';
//import ReactDOM from 'react-dom';
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
    main: "#ffcb74",
  },
  secondary: {
    main: '#ffcb74',
  },
}));
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffcb74",
    },
    secondary: {
      main: '#ffcb74',
    },
  },
});

const NavbarAwal = (props)=> {
  const classes = useStyles();
  return (
    <div>
    <ThemeProvider theme={theme} id="container">
    <div className={classes.root}>
      <AppBar 
      position="static" 
      color="secondary"
      id="app_bar"
      style={{backgroundColor:"#ffcb74"}}
      >
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          */}
          <Typography variant="h4" className={classes.judul} id= "judul" align = "left" style={{fontFamily:'Carter One', color:"#ffffff", cursor:"pointer"}}
          onClick={()=> history.push('/home')}>
           Sembako Go!
          </Typography>
          <Link  onClick={() => history.push('/Login')} style={{color:'#ffffff'}}>Login</Link>
          
        </Toolbar>
      </AppBar>
    </div>
  </ThemeProvider>
  </div>
  
  );
}
export default withRouter(NavbarAwal);