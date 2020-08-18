import React, { Component } from 'react';
import { register } from '../UserFunctions';

class RegisterPenjual extends Component {
  constructor() {
    super()
    this.state = {
      Nama: '',
      Nama_Toko: '',
      Email: '',
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

    const newUser = {
      Nama: this.state.Nama,
      Nama_Toko: this.state.Nama_Toko,
      Email: this.state.Email,
      Password: this.state.Password
    }

    register(newUser).then(res => {
      this.props.history.push(`/login`)
    })
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
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="Email"
                  placeholder="Enter email"
                  value={this.state.Email}
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