import React, { Component } from 'react';
// import { register } from '../UserFunctions';
import Navbar from '../../Component/NavbarAwal';
import {Form} from 'react-bootstrap'
import axios from 'axios';

class Register extends Component {
  constructor() {
    super()
    this.state = {
      Nama_pengguna: '',
      Nama_toko: '',
      Username: '',
      Password: '',
      Alamat: '',
      Kota:'',
      Roles: '',
      Foto:'',
      errors: {}
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.yesnoCheck=this.yesnoCheck.bind(this)
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.name === "Foto"? e.target.files[0] : e.target.value          
  })
  }
  onSubmit(e) {
    e.preventDefault()
    const newUser = new FormData();
     newUser.append ("Nama_pengguna",this.state.Nama_pengguna);
     newUser.append ("Nama_toko", this.state.Nama_toko);
     newUser.append("Username",this.state.Username);
     newUser.append("Password",this.state.Password);
     newUser.append("Alamat",this.state.Alamat);
     newUser.append("Kota",this.state.Kota);
     newUser.append("Foto",this.state.Foto);
     newUser.append("Roles",this.state.Roles);
     const config={
       headers:{
        'content-type' : 'multipart/form-data'
       }
     }
     if( !document.getElementById('alamat').value || !document.getElementById('nama').value ||
         !document.getElementById('username').value || !document.getElementById('password').value || 
         !document.getElementById('kota').value 
     ){
      alert("Data ini penting! harap masukan data!!!!")
  }else if(!this.state.Roles){
    alert("Masukan Roles Anda")
  }else{
    console.log(newUser)
    axios.post('http://140.238.205.80/Users/register',newUser,config)
    .then(res => { 
      localStorage.setItem('usertoken',res.data.token);
      if(this.state.Roles ==="Penjual"){
        this.props.history.push(`/DashboardPenjual`)
        return res;
      }else if (this.state.Roles ==="Pembeli"){
        this.props.history.push(`/HalamanAwal`)
        return res;
      }else{
        alert("Gagal Register, Masukan data dengan benar")
      }
  }).catch((err)=>{
    alert("Gagal Membuat akun, mungkin user name anda sudah terpakai")
    console.log(err);
  })
}
} 
yesnoCheck() {
    if (document.getElementById("yesCheck").checked) {
      this.state.Roles="Penjual"
      document.getElementById("ifYes").style.visibility = "visible";
      document.getElementById("foto").style.visibility = "visible";
    } else  {
      this.state.Roles="Pembeli" 
        document.getElementById("ifYes").style.visibility = "hidden";
        document.getElementById("foto").style.visibility = "hidden"; 
    }
  }
  render() {
    return (
    <div>
      <Navbar/>
      <div className="container">
        
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Register</h1>
              <div className="form-group">
                <label htmlFor="name">Nama Pemilik</label>
                <input
                  id="nama"
                  type="text"
                  className="form-control"
                  name="Nama_pengguna"
                  placeholder="Enter your first name"
                  value={this.state.Nama_pengguna}
                  onChange={this.onChange}
                />
              </div>
          <div className="form-group">
                <label htmlFor="name">Alamat</label>
                <input
                  id="alamat"
                  type="text"
                  className="form-control"
                  name="Alamat"
                  placeholder="Masukan Alamat"
                  value={this.state.Alamat}
                  onChange={this.onChange}
                />
              </div>
            <div className="form-group">
                <label htmlFor="name">Kota</label>
                <input
                  id="kota"
                  type="text"
                  className="form-control"
                  name="Kota"
                  placeholder="Masukan Kota"
                  value={this.state.Kota}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Username">Username</label>
                <input
                  id="username"
                  type="Username"
                  className="form-control"
                  name="Username"
                  placeholder="Enter Username"
                  value={this.state.Username}
                  onChange={this.onChange}
                />
              </div>
              <br/>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="Password"
                  className="form-control"
                  name="Password"
                  placeholder="Password"
                  value={this.state.Password}
                  onChange={this.onChange}
                />
              </div>
              <div>
               <p>Kamu adalah seorang : </p>
                 Penjual{" "}
                   <input
                    type="radio"
                    onClick={this.yesnoCheck}
                    name="yesno"
                    id="yesCheck"
                    value="Penjual"
                    /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Pembeli{" "}
                    <input
                      type="radio"
                      onClick={this.yesnoCheck}
                      name="yesno"
                      id="noCheck"
                      value="Pembeli"
                      onChange={this.onChange}
                    />
          <br />
          <br/> 
          <Form id="foto" className="container"style={{marginTop:28},{ visibility: "hidden" }}  noValidate onSubmit={this.onSubmit}>               
                  <Form.Row controlId="exampleForm.ControlInput1">
                        <Form.Group>
                        <Form.File 
                        id="exampleFormControlFile1" 
                        label="Masukan Foto toko / logo toko anda"
                        type="Foto"
                        name="Foto"
                        value={this.setState.Foto}
                        onChange={this.onChange}
                        />
                        </Form.Group>
                    </Form.Row>
              </Form>
          <div id="ifYes" style={{ visibility: "hidden" }}>
              <div className="form-group">
                <label htmlFor="name">Nama Toko</label>
                <input
                  type="text"
                  className="form-control"
                  name="Nama_toko"
                  placeholder="Enter your lastname name"
                  value={this.state.Nama_toko}
                  onChange={this.onChange}
                />
              </div>
            </div>
          </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Register!
              </button>
            </form>
          </div>
        </div>
      </div>
      <br/>
      <br/>
    </div>
    )
  }
}

export default Register;