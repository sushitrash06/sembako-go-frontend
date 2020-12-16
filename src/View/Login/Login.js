import React, { Component } from 'react';
import { login} from '../UserFunctions';
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
      Roles:'',
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
    const user = {
      Username: this.state.Username,
      Password: this.state.Password,
    }  
        /* const token = localStorage.getItem('usertoken')*/
         //const decoded = token ? jwt_decode(token) : null;
         // this.setState({
         //   Roles:decoded ? decoded.Roles : null
          //)
          //console.log(typeof user.Username, typeof user.Password,'test');*/
    await login(user).then(token=>{
      if (token) {
        const decoded = jwt_decode(token);
        if (decoded.Roles === "Penjual") {
          console.log(decoded.Roles)
          this.props.history.push(`/DashboardPenjual`)
        } else if (decoded.Roles === "Pembeli") {
          this.props.history.push(`/HalamanAwal`)
        } else {
          alert("Gagal Login,coba lagi")
          this.props.history.push('/Login')
        }
      }
      }).catch((err)=>{
        alert("Gagal login!!")
        console.log(err);
      })
    }
      
    
  ////*{componentDidMount(){
    ///const token = localStorage.usertoken
    //const decoded = jwt_decode(token)
    ///this.setState({
      ///Roles: decoded.Roles
    //})
  //}

  render() {
    return (
      <div id="root">
        <NavbarAwal/>
      
      <div className="container">
        <div className="col">
          <div className="col-md-6 mt-5 mx-auto">
          <Paper style={{width:'100%', height: '380px', backgroundColor:"#d9dbd9"}} elevation={4}>
            <form noValidate onSubmit={this.onSubmit} className="container">
              <br/>
              <h1 className="h3 mb-3 font-weight-normal">Ayo Login dulu!</h1>
              <div className="form-group">
                <TextField
                  id="standard-basic"
                  type="Username" 
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
              Tidak ada akun? Register di <Link onClick={()=> history.push('/Register')} style={{cursor:"pointer"}}>sini</Link>
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