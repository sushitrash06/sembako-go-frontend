import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../../Component/NavbarAdmin';
import jwt_decode from 'jwt-decode';
import {Form, Row, Col} from 'react-bootstrap';
import { Paper } from '@material-ui/core';
import PropsTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Gambar from '../../img/Admin.png'
import { Link } from 'react-router-dom';
import history from '../../history';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = theme =>({
    root:{
        display: "flex",
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(0, 3),
    },
    media:{
        height: 140,
    },
    paper: {
        // maxWidth: 400,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
      },
      details: {
        display: 'flex',
        flexDirection: 'column',
      },
      content: {
        flex: '1 0 auto',
      },
      cover: {
        width: 151,
      },
      controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
      },
})
class ProfilAdmin extends React.Component{
  constructor(){
      super()
      this.state={
          Username:'',
          penjual:[],
          pembeli:[],
          total:[],
      }
  }
  Total=()=>{
      var header = new Headers();
        header.append("Content-Type","application/json");
        fetch('http://localhost:4000/Users/Total/',{
            method:"GET",
            header:header,
        }).then((res)=> res.json())
        .then(
            (result)=>{
                this.setState(()=>({
                    total:result,
                }));
                console.log(this.state.total)
            },(error)=>{
                this.setState(error);
                console.log(error)
            }
        );
  };
  penjual=()=>{
    var header = new Headers();
      header.append("Content-Type","application/json");
      fetch('http://localhost:4000/Users/Jumlah/Penjual',{
          method:"GET",
          header:header,
      }).then((res)=> res.json())
      .then(
          (result)=>{
              this.setState(()=>({
                  penjual: result,
                  count: result.count
              }));
              console.log(this.state.count)
          },(error)=>{
              this.setState(error);
              console.log(error)
          }
      );
  }
  pembeli=()=>{
    var header = new Headers();
      header.append("Content-Type","application/json");
      fetch('http://localhost:4000/Users/Jumlah/Pembeli',{
          method:"GET",
          header:header,
      }).then((res)=> res.json())
      .then(
          (result)=>{
              this.setState(()=>({
                  pembeli:result,
              }));
              console.log(this.state.count)
          },(error)=>{
              this.setState(error);
              console.log(error)
          }
      );
  }
  componentDidMount=()=>{
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      Username: decoded.Username,
    })
    console.log(this.state.Username)
      this.penjual();
      this.pembeli();
      this.Total();
  }
    render(){
        const {total,penjual,pembeli}=this.state
        const {classes}= this.props;
        return(
            <div style={{margin:"0px"}}>
                <Navbar/>
                <br/>
                <div className="container">
                <div style={{margin:"0px"}}>
                <Paper style={{backgroundColor:"#96d6b1"}}>
                <Form>
                    <Row className="container">
                    <Col>
                     <div className="container">
                        <br/>
                        <h2 style={{color:"#ffff"}}>Selamat Datang Admin!</h2>
                        <h4 style={{color:"#ffff"}}>{this.state.Username}</h4>
                    </div>
                    </Col>
                    <Col>
                    <br/>
                    <div>
                        <img align="right"style={{maxWidth:"50%"}} src={Gambar} alt="gambar"/>
                    </div>
                    </Col>
                    </Row>
                </Form>
                <br/>
                <br/>
                </Paper>
                </div>
          <br/>
          <h2>Produk ku</h2>
                <div>
                    <Paper className={classes.paper}>
                        <Grid container wrap="nowrap" spacing={2}>
                        <Grid item xs>
                            <h3>Jumlah Semua User</h3>
                            <Typography><h4>{total.count}</h4></Typography>
                            <Typography><Link onClick={() => history.push('/SemuaUser')}>lihat semua user</Link></Typography>

                        </Grid>
                        </Grid>
                    </Paper>
                
                    <Paper className={classes.paper}>
                        <Grid container wrap="nowrap" spacing={2}>
                        <Grid item xs>
                            <h3>Jumlah User Penjual </h3>
                            <Typography>{penjual.count}</Typography>
                            <Typography><Link onClick={() => history.push('/UserPenjual')}>lihat semua user Penjual</Link></Typography>
                        </Grid>
                        </Grid>
                    </Paper>
                
                    <Paper className={classes.paper}>
                        <Grid container wrap="nowrap" spacing={2}>
                        <Grid item xs>
                            <h3>Jumlah User Pembeli</h3>
                            <Typography>{pembeli.count}</Typography>
                            <Typography><Link onClick={() => history.push('/UserPembeli')}>lihat semua user Pembeli</Link></Typography>
                        </Grid>
                        </Grid>
                    </Paper>
                </div>
                </div>
            </div>
        )
    }
}
ProfilAdmin.propTypes ={
    classes: PropsTypes.object.isRequired
};
export default withStyles(styles)(ProfilAdmin);