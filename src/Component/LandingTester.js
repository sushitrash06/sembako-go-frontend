import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'

class LandingTester extends Component {
  constructor() {
    super()
    this.state = {
      Nama: '',
      Nama_toko: '',
      Email: '',
      errors: {}
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      Nama: decoded.Nama,
      Nama_toko: decoded.Nama_toko,
      Email: decoded.Email
    })
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>Nama</td>
                <td>{this.state.Nama}</td>
              </tr>
              <tr>
                <td>Nama Toko</td>
                <td>{this.state.Nama_toko}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.Email}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default LandingTester;