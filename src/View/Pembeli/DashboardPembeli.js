import React from 'react';
import {CardGroup,Card} from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarUser from '../../Component/NavbarUser'
// import CariProduk from './trash/cari_config'

class DashboardPembeli extends React.Component{

  constructor(){
    super()
    this.state={
      Nama: '',
    }
  }
  componentDidMount(){
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      Nama: decoded.Nama,
    })
  }

  render(){
    return(
        <div className="DashboardPenjual">
          <NavbarUser/>
            <h1>Welcome : </h1>
            <h1>{this.state.Nama}</h1>
              <CardGroup>
                <Card>
                  <Card.Img variant="top" src="holder.js/100px160" />
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                      This is a wider card with suppo rting text below as a natural lead-in to
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
export default DashboardPembeli;