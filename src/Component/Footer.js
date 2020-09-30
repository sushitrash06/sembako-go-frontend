import React from 'react';
//import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import '../App.css';

function Copyright() {
    return (
      <Typography style={{textAlign:'center'}} variant="body2" color="textSecondary" className="copikanan">
        {'Copyright © '}
        <Link color="inherit" href="https://github.com/sushitrash06" className="linknya" align="center">
          Github  - Sushitrash06
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      },
      text: {
          textAlign:"center",
      },
    }));

    export default function Footer(){
        const classes = useStyles();
    return(
        <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1" className={classes.text}>Azka Andya - Sembako Go!</Typography>
          <Copyright />
        </Container>
      </footer>
    );
}
