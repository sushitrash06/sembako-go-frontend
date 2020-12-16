import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarPenjual from '../../Component/NavbarPenjual';
import jwt_decode from 'jwt-decode';
import gambar from './Penjual.png';
import {Form, Row, Col} from 'react-bootstrap';
import { Paper } from '@material-ui/core';

class Profil extends React.Component{
  constructor(){
      super()
      this.state={
          Nama_toko:'',
          Nama:'',
          Alamat:''
      }
  }
  componentDidMount(){
      const token=localStorage.getItem('usertoken')
      const decoded = jwt_decode(token)
      this.setState({
          Nama_toko: decoded.Nama_toko,
          Nama: decoded.Nama,
          Alamat: decoded.Alamat
      })
  }
    render(){
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
                                <h1 >{this.state.Nama}</h1>
                                <h2 >Nama toko : {this.state.Nama}</h2>
                                <h2 >Lokasi: {this.state.Alamat}</h2>
                            </div>
                            </Col>
                            <Col>
                            <br/>   
                            <div>
                                <img align="right"style={{width:"70%"}} src={gambar} alt="gambar"/>
                            </div>
                            </Col>
                            </Row>
                        </Form>
                        <br/>
                        <br/>
                </Paper>
        </div>
          <br/>
                </div>
            </div>
        )
    }
}
export default Profil; 