import React, { Component } from 'react';
import { loginAdmin} from '../UserFunctions';
import jwt_decode from 'jwt-decode';
import NavbarAwal from '../../Component/NavbarAwal';
// import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Paper, Link } from '@material-ui/core';
import history from '../../../src/history';



class Login extends Component {
  constructor() {
    super()
    this.state = {
      Username: '',
      Password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    ///this.componentDidMount=this.componentDidMount(this)
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  async onSubmit(e) {
    e.preventDefault();
    const admin = {
      Username: this.state.Username,
      Password: this.state.Password,
    }  
    await loginAdmin(admin).then(token=>{
      if (token) {
        const decoded = jwt_decode(token);
        if (decoded.Username ==="admin_chan"){
          this.props.history.push(`/AdminHome`)
        }else{
        this.props.history.push(`/LoginAdmin`)
      }
    }
      }).catch((err)=>{
        alert("Gagal login!!")

        console.log(err);
      })
    }

  render() {
    return (
      <div id="root">
        <NavbarAwal/>
      <div className="container">
        <div className="col">
          <div className="col-md-6 mt-5 mx-auto">
          <Paper style={{width:'100%', height: '380px'}} elevation={4}>
            <form noValidate onSubmit={this.onSubmit} className="container">
              <br/>
              <h1 className="h3 mb-3 font-weight-normal">Halo Admin! Silahkan Login</h1>
              <div className="form-group">
                <TextField
                  id="standard-basic"
                  type="Username" nb   
                  label="username"
                  className="form-control"
                  name="Username"
                  placeholder="Enter Username"
                  value={this.state.Username}
                  onChange={this.onChange} 
                  style={{background:"transparent"}}
                />
              </div>
              <div className="form-group">
                
                <TextField
                  id="standard-basic"
                  label="Password"
                  type="password"
                  className="form-control"
                  name="Password"
                  placeholder="Password"
                  value={this.state.Password}
                  onChange={this.onChange}
                  style={{background:"transparent"}}
                />
              </div>
              <br/>
              <button
                type="submit"
                className="btn btn-lg btn-info btn-block"
                color="#fcd381"
              >
                Sign in
              </button>
              <br/>
            </form>
            </Paper> 
          </div>
        </div>
      </div>
      
    </div>
    )
  }
}
export default Login;