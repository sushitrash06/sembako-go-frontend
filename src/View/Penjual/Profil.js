import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarPenjual from '../../Component/NavbarPenjual';
import { Button } from 'react-bootstrap';
import ProdukList from './ViewProdukKu';
import history from '../../../src/history';
import jwt_decode from 'jwt-decode';
import gambar from './Penjual.png';
import {Form, Row, Col} from 'react-bootstrap';
import { Paper } from '@material-ui/core';

class Profil extends React.Component{
  constructor(){
      super()
      this.state={
          User:[],
          Nama_toko:'',
          Nama_pengguna:'',
      }
  }
  componentDidMount(){
      const token=localStorage.getItem('usertoken')
      const decoded = jwt_decode(token)
      this.setState({
          Username:decoded.Username,
          Nama_toko: decoded.Nama_toko,
          Nama_pengguna: decoded.Nama_pengguna,
        //   Alamat: decoded.Alamat,
          id_user:decoded.id_user
      })
      var header = new Headers();
            header.append("Content-Type","application/json");
            // console.log(Username)
        fetch(`http://localhost:4000/Users/Penjual/User/${decoded.Username}`,{
            method: "GET",
            header:header,
        }).then(res=>res.json())
        .then(
            (result)=>{
                this.setState({
                    User:result,
                    isLoaded: true,
                });
                // console.log(User.Alamat)   
            },(error) =>{
                this.setState((error));
                console.log(error)
            })
  }
    render(){
        const {User}=this.state;
        return(
            <div>
                <NavbarPenjual/>
                <div className="container">
                    <br/>
                    <div style={{margin:"0px"}}>
                        <br/>            
                        <Paper style={{backgroundColor:"#cce3d6"}}>
                        <Form>
                            <Row className="container">
                            <Col>
                            <div className="container">
                                <br/>
                                <h1 >Welcome :</h1>
                                <h1 >{this.state.Nama_pengguna}</h1>
                                <h2 >Nama toko : {this.state.Nama_toko}</h2>
                                <h2 >Lokasi: {User.Alamat}</h2>
                            </div>
                            </Col>
                            <Col>
                            <br/>   
                            <div>
                                <img align="right"style={{width:"70%"}} src={`http://localhost:4000${User.Foto}`} alt="gambar"/>
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
                <ProdukList/>
                </div>
            </div>
        )
    }
}
export default Profil; 