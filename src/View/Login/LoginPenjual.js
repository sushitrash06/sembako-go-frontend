import React, { Component } from 'react';
import { login} from '../UserFunctions';

class LoginPenjual extends Component {
  constructor() {
    super()
    this.state = {
      Username: '',
      Password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const user = {
      Username: this.state.Username,
      Password: this.state.Password
    }

    login(user).then(res => {
      if (res) {
        if(Roles=="Penjual"){
          this.props.history.push(`/DashboardPenjual`)
        }else if (Roles=="Pembeli"){
          this.props.history.push(`/DashboardPembeli`)
        }else{
          alert("Gagal Login, Masukan data dengan benar")
        }
      }
    })
  }

  render() {
    return (
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
    )
  }
}

export default LoginPenjual;