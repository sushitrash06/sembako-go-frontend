import React from 'react';
import {CardGroup,Card,Modal, Form,ButtonToolbar, Button} from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarPenjual from '../../Component/NavbarPenjual';
// import addproduk from '../../View/UserFunctions';
import history from '../../history';
import ProdukList from './Produklist';

class DashboardPenjual extends React.Component{
  constructor(){
    super()
    this.state=
    {
      Nama_toko: ''
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
<div>
  <NavbarPenjual/>
        <div className="container">
                
            <h1>Welcome : </h1>
            <h1>{this.state.Nama_toko}</h1>
            <Button style={{marginBottom:"30px",marginTop:"30px"}}onClick={()=> history.push('/TambahProduk')}>
                   Tambah Produk
                  </Button>
              <div>
              
                  <ProdukList/>
              </div>
          </div>
</div>
    )}
}
export default DashboardPenjual;