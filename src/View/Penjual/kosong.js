import React, {Component} from 'react';
// import {Card, Alert, Container, Form, Col, FormGroup, FormControl, FormLabel, Button} from 'react-bootstrap';
// import Grid from '@material-ui/core/Grid';
import 'bootstrap/dist/css/bootstrap.min.css';
// import jwt_decode from 'jwt-decode';
import gambar1 from './tidak_ada.png';

class Kosong extends Component{
    render(){
        return(
            <div className="container">
                <img src={gambar1} alt="gambar1" style={{display:"block",marginLeft:"auto",marginRight:"auto"}}>
                </img>
            </div>
        )
    }
}
export default Kosong;