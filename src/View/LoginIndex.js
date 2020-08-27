import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import '../App.css';
import gambarpenjual from '../img/PenjualGambar.png';
import gambarpembeli from '../img/PembeliGambar.png';
import { Button} from 'react-bootstrap';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
//import { purple } from '@material-ui/core/colors';
import '@material-ui/core/colors';
import {useMediaQuery} from 'react-responsive';
import history from '../history';
import {BrowserRouter as Router,withRouter} from 'react-router-dom';
import NavbarAwal from '../Component/NavbarAwal';
//import { withRouter } from 'react-router-dom';

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 991 })
  return isDesktop ? children : null
}

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({  minWidth: 767, maxWidth: 991 })
  return isMobile ? children : null
}

const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ maxWidth: 768 })
  return isNotMobile ? children : null
}

const useStyles = makeStyles((theme)=>({
    root: {
        flexGrow: 1,
        display: 'flex',
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      height: 400,
      marginTop: '35px',
      width: 500,
      alignItems: 'center',
      backgroundColor:theme.palette.warning.light,
    },
    paper2:{
      display:'flex',
      padding: theme.spacing(1),
      textAlign: 'right',
      maxHeight: 200,
      marginTop: '35px',
      width: 500,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:theme.palette.warning.light,
    },

      image: {
        width: 128,
        height: 128,
      },
      img: {
        display:'flex',
        maxWidth: '100%',
        maxHeight: '100%',
      },
      imgPedagang: {
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      },
      imgPembeli: {
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
      },
      img2: {
        margin:'auto',
        display: 'block',
        maxWidth:'100%',
      },
      Button:{
        marginTop:'50',
      },

      
    }));
    const warna = createMuiTheme({
      palette: {
        primary: {
          main: '#00a152',
        },
        secondary: {
          main: '#00a152',
        },
      },
    });
    
const LoginIndex =(props)=> {
    const [spacing]=React.useState(2);
    const classes = useStyles();

    return(
    <Router>
    <NavbarAwal/>
    <ThemeProvider theme={warna} id="container">
    <div className={classes.root}>
     <Desktop>
       <Grid 
       direction = "row"
       className={classes.Grid}
       container spacing={5}
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
        id="grid2"
       >
             <Grid item xs={3}>
             <Grid container justify="center" spacing={spacing}>
                <Paper className={classes.paper}
                >
                <img className={classes.img} alt="penjual" src={gambarpenjual}></img>
                    <Button onClick={()=> history.push('/LoginPenjual')}>Login</Button>
                </Paper>
            </Grid>
            </Grid>
            <Grid item xs={3}>
            <Grid container justify="center" spacing={spacing}>
                <Paper className={classes.paper}>
                    <img className={classes.img2} alt="pemebeli" src={gambarpembeli}></img>
                        <Button justify="center"onClick={()=> history.push('/RegisterPenjual')}>Register</Button>
                </Paper>
                </Grid>
            </Grid>
        </Grid>
      </Desktop>
      <Mobile>
      <Grid 
       direction = "column"
       className={classes.Grid}
       container spacing={5}
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
        id="grid2"
       >
             <Grid item xs={12}>
             <Grid container justify="center" spacing={spacing}>
                <Paper className={classes.paper2}
                >
                <img className={classes.imgPedagang} alt="penjual" src={gambarpenjual}></img>
                    <Button justify="center"onClick={()=> history.push('/LoginPenjual')}>Login</Button>
                </Paper>
            </Grid>
            </Grid>
            <Grid item xs={12}>
            <Grid container justify="center" spacing={spacing}>
                <Paper className={classes.paper2}>
                    <img className={classes.imgPembeli} alt="pemebeli" src={gambarpembeli}></img>
                        <Button className={classes.Button} onClick={()=> history.push('/RegisterPenjual')}>Register</Button>
                </Paper>
                </Grid>
            </Grid>
        </Grid>

      </Mobile>
      <Default>
      <Grid 
       direction = "column"
       className={classes.Grid}
       container spacing={5}
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
        id="grid2"
       >
             <Grid item xs={12}>
             <Grid container justify="center" spacing={spacing}>
                <Paper className={classes.paper2}
                >
                <img className={classes.imgPedagang} alt="penjual" src={gambarpenjual}></img>
                    <Button onClick={()=> history.push('/LoginPenjual')}>Login</Button>
                </Paper>
            </Grid>
            </Grid>
            <Grid item xs={12}>
            <Grid container justify="center" spacing={spacing}>
                <Paper className={classes.paper2}>
                    <img className={classes.imgPembeli} alt="pemebeli" src={gambarpembeli}></img>
                        <Button justify="center"onClick={()=> history.push('/RegisterPenjual')}>Register</Button>
                </Paper>
                </Grid>
            </Grid>
        </Grid>
      </Default>
    </div>
    </ThemeProvider>
    </Router>
    );
}
export default withRouter(LoginIndex);