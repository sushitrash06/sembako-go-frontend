import React from 'react';
import {CardGroup,Card} from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarPenjual from '../../Component/NavbarPenjual';

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
  <NavbarPenjual/>
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