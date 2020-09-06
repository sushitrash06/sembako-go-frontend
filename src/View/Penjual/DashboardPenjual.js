import React from 'react';
import {CardGroup,Card,Modal} from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';
//import NavbarPenjual from '../../Component/NavbarPenjual';


class TambahProduk extends React.Component{
  render(){
    return(
      <Modal
        {...this.props}
        size="lg"
        dialogClassName="modal-90w"
        aria-labelledby ="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Tambakan Produk
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>

      </Modal>
    )
  }
}

class DashboardPenjual extends React.Component{

  constructor(){
    super()
    this.state={
      Nama_toko: '',
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

        <div className="DashboardPenjual">
            <h1>Welcome : </h1>
            <h1>{this.state.Nama_toko}</h1>
                <CardGroup>
                  <Card>
                    <Card.Img variant="top" src="holder.js/100px160" />
                    <Card.Body>
                      <Card.Title>Card title</Card.Title>
                      <Card.Text>
                        This is a wider card with supporting text below as a natural lead-in to
                        additional content. This content is a little bit longer.
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">Last updated 3 mins ago</small>
                    </Card.Footer>
                  </Card>
                </CardGroup>
          </div>

    )}
}
export default DashboardPenjual;