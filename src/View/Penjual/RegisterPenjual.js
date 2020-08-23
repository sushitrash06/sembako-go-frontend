import React, { Component } from 'react';
import { register } from '../UserFunctions';

class RegisterPenjual extends Component {
  constructor() {
    super()
    this.state = {
      Nama: '',
      Nama_toko: '',
      Username: '',
      Password: '',
      Alamat: '',
      Roles: '',
      errors: {}
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.yesnoCheck=this.yesnoCheck.bind(this)
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()
    const newUser = {
      Nama: this.state.Nama,
      Nama_toko: this.state.Nama_toko,
      Username: this.state.Username,
      Password: this.state.Password,
      Alamat: this.state.Alamat,
      Roles: this.state.Roles
    }
    register(newUser).then(res => {
        localStorage.setItem('usertoken',res.data.token);
        
        if(this.state.Roles ==="Penjual"){
          this.props.history.push(`/DashboardPenjual`)
        }else if (this.state.Roles ==="Pembeli"){
          this.props.history.push(`/DashboardPembeli`)
        }else{
          alert("Gagal Register, Masukan data dengan benar")
        }
    })
  }
  yesnoCheck() {
    if (document.getElementById("yesCheck").checked) {
      this.state.Roles="Penjual"
      document.getElementById("ifYes").style.visibility = "visible";
    } else  {
      this.state.Roles="Pembeli" 
     document.getElementById("ifYes").style.visibility = "hidden";
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Register</h1>
              <div className="form-group">
                <label htmlFor="name">Nama Pemilik</label>
                <input
                  type="text"
                  className="form-control"
                  name="Nama"
                  placeholder="Enter your first name"
                  value={this.state.Nama}
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
                    />
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
          <div className="form-group">
                <label htmlFor="name">Alamat</label>
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
                <label htmlFor="Username">Username</label>
                <input
                  type="Username"
                  className="form-control"
                  name="Username"
                  placeholder="Enter Username"
                  value={this.state.Username}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
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
              >
                Register!
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default RegisterPenjual;