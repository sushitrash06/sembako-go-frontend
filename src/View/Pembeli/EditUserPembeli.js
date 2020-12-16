import React, { Component } from 'react';
import Navbar from '../../Component/NavbarUser';
import axios from 'axios';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import jwt_decode from 'jwt-decode';
import {Form, Row, Col} from 'react-bootstrap';
import { Modal,ModalBody} from 'reactstrap';

class Register extends Component {
  constructor() {
    super()
    this.state = { 
      ModalSuccess:false,
      Nama_pengguna: '',
      Password: '',
      Alamat: '',
      Kota:'',
      Foto:'',   
      Username:'',
      errors: {}
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  
  ModalSuccess(){
      this.setState(({ModalSuccess: !this.state.ModalSuccess}))
  }
  componentDidMount(){
    const token = localStorage.getItem('usertoken')
    const decoded = jwt_decode(token)
    this.setState({ 
      Nama_pengguna:decoded.Nama_pengguna,
      Alamat: decoded.Alamat,
      Kota:decoded.Kota,
      id_user:decoded.id_user,
      Username:decoded.Username,
    })
    console.log(this.state.Kota)
  }
  
  onSubmit(e) {
    e.preventDefault()
    // const token = localStorage.getItem('usertoken')
    const newUser = new FormData();
     newUser.append ("Nama_pengguna",this.state.Nama_pengguna);
     newUser.append ("Nama_toko", this.state.Nama_toko);
     newUser.append("Password",this.state.Password);
     newUser.append("Alamat",this.state.Alamat);
     newUser.append("Username",this.state.Username);
     newUser.append("Kota",this.state.Kota);
     newUser.append("Foto",this.state.Foto);     
     const config={
       headers:{
        'content-type' : 'multipart/form-data'
        // ,'Authorization': 'Bearer '+token
       }
     }
     console.log(newUser)
    //  console.log(this.state.Username)
     axios.put('http://localhost:4000/Users/editprofile/'+this.state.id_user,newUser,config)
     .then(res=>{
      // localStorage.setItem('usertoken',res.data.token);
      this.ModalSuccess();
      this.componentDidMount();
      return res;
     }).catch((err)=>{
        alert("gagal mengupdate :(")
        console.log(err);
     })
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.name === "Foto"? e.target.files[0] : e.target.value          
  })
  }

  
  render() {
    return (
    <div>
      <Navbar/>
      <div className="container">
        
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Edit Akun</h1>
              <div className="form-group">
                <label htmlFor="Nama_pengguna">Nama Pemilik</label>
                <input
                  type="text"
                  className="form-control"
                  name="Nama_pengguna"
                  placeholder="Enter your first name"
                  value={this.state.Nama_pengguna}
                  onChange={this.onChange}
                />
              </div>
              <Form>
              <Form.Group as={Row} controlId="formPlaintextEmail">
                <Form.Label column sm="2">
                  Username
                </Form.Label>
                <br/>
                <Col sm="10">
                  <Form.Control plaintext readOnly value={this.state.Username} onChange={this.onChange}/>
                </Col>
              </Form.Group>
              </Form>
          <div className="form-group">
                <label htmlFor="Alamat">Alamat</label>
                <input
                  type="text"
                  className="form-control"
                  name="Alamat"
                  placeholder="Masukan Alamat"
                  value={this.state.Alamat}
                  onChange={this.onChange}
                />
              </div>
            <div className="form-group">
                <label htmlFor="Kota">Kota</label>
                <input
                  type="text"
                  className="form-control"
                  name="Kota"
                  placeholder="Masukan Kota"
                  value={this.state.Kota}
                  onChange={this.onChange}
                />
              </div>
              <br/>
              <Form className="container"style={{marginTop:28}} noValidate onSubmit={this.onSubmit}>               
                  <Form.Row controlId="exampleForm.ControlInput1">
                        <Form.Group>
                        <Form.File 
                        id="exampleFormControlFile1" 
                        label="Masukan Foto toko / logo toko anda kembali" 
                        type="Foto"
                        name="Foto"
                        value={this.setState.Foto}
                        onChange={this.onChange}
                        />
                        </Form.Group>
                    </Form.Row>
              </Form>
              <br/>
              <div className="form-group">
                <label htmlFor="Password">Password</label>
                <input
                  type="Password"
                  className="form-control"
                  name="Password"
                  placeholder="Password"
                  value={this.state.Password}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
                onSubmit ={this.onSubmit}
              >
                Update Data!
              </button>
            </form>
          </div>
        </div>
      </div>
      <Modal isOpen={this.state.ModalSuccess}>
         <ModalBody onClick={()=>this.ModalSuccess()}>
            Sukses! <CheckCircleIcon 
                style={{ 
                color:'#49e35d',fontSize: 30 
                }}/>
                </ModalBody>
        </Modal>
    </div>
    )
  }
}

export default Register;