import React, { Component } from 'react';
import { login} from '../UserFunctions';
import jwt_decode from 'jwt-decode';
import NavbarAwal from '../../Component/NavbarAwal';

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
          this.props.history.push(`/DashboardPembeli`)
        } else {
          alert("Gagal Login,coba lagi")
        }
      }
      /* if (res.data.token){
        localStorage.setItem('usertoken',res.data.token);
        if(decoded.Roles ==="Penjual"){
            this.props.history.push(`/DashboardPenjual`)
          }else if (decoded.Roles ==="Pembeli"){
            this.props.history.push(`/DashboardPembeli`)
          }else{ 
            alert("Gagal Login, coba lagi!")
          }
        } */
      } ).catch((err)=>{
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
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
              <div className="form-group">
                <label htmlFor="Username">Username address</label>
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
                  type="password"
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
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
export default Login;