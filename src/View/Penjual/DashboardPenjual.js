import React from 'react';
import {Form, Row, Col} from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarPenjual from '../../Component/NavbarPenjual';
import { Paper } from '@material-ui/core';
import gambar from './Penjual.png';
import ProdukView from './ViewProdukKu';

class DashboardPenjual extends React.Component{
  constructor(){
    super()
    this.state=
    {
      Nama_toko: '',
    }
  }
  componentDidMount(){
    const token = localStorage.getItem('usertoken')
    const decoded = jwt_decode(token)
    this.setState({
      Nama_toko: decoded.Nama_toko,
    })
  }

  render(){
    return(
<div style={{margin:"0px"}}>
  <NavbarPenjual/>       
  <div style={{margin:"0px"}}>
          <Paper style={{backgroundColor:"#96d6b1"}}>
          <Form>
            <Row className="container">
              <Col>
              <div className="container">
                <br/>
                <p style={{color:"#ffff", fontSize:'5vw'}}>Welcome </p>
                <p style={{color:"#ffff", fontSize:'5vw'}}>{this.state.Nama_toko}</p>
              </div>
              </Col>
              <Col>
              <br/>
              <div>
                <img align="right"style={{maxWidth:"70%", minWidth:"50%" }} src={gambar} alt="gambar"/>
              </div>
              </Col>
              </Row>
          </Form>
          <br/>
          <br/>
          </Paper>
            </div>
            <br/>
            <h1 className="container"> Produk ku</h1>
          <ProdukView/>
</div>
    )}
}
export default DashboardPenjual;