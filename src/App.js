import React from 'react';
//import logo from './logo.svg';
import './App.css';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';  
import NavbarAwal from './Component/NavbarAwal';
import jwt_decode from 'jwt-decode';

//import Banner from './Component/Banner';
//import gambar from './img/gambar4.jpg';
import 'react-bootstrap';
//import Figure from 'react-bootstrap/Figure';
//import FigureImage from 'react-bootstrap/FigureImage';
//import FigureCaption from 'react-bootstrap/FigureCaption';
//import Footer from './Component/Footer';
//import Routes from './Router';
import NavbarPembeli from './Component/NavbarUser';
import NavbarPenjual from './Component/NavbarPenjual';
import { login, register } from './View/UserFunctions';

class App extends React.Component{
  constructor(){
    super()
      this.state={
        Roles: '',
          }
      }
  render(){
    const token = localStorage.getItem('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoxOSwiTmFtYV90b2tvIjoiTmlob25nbyBNYW50YXBwdSIsIlVzZXJuYW1lIjoiamFyb21lIiwiUm9sZXMiOiJQZW5qdWFsIiwiaWF0IjoxNTk4MzAyMjg2LCJleHAiOjE1OTgzMDM3MjZ9.NDUbgXG1mLfXqHiAyTfruICDW7nsvVYMXAhANIqIsPM')
    console.log(token);
    if (token === null ){
      return <NavbarAwal/>
    }
    const decoded = jwt_decode(token)
      this.setState({
        Roles:decoded.Roles
      })
      const user = {
        Roles: this.state.Roles
      }
      const newUser ={
        Roles : this.state.Roles
      }
      console.log(login(user))
      if(login(user)){
        if(this.state.Roles==="Penjual"){
          return <NavbarPenjual/>;
        }else if(this.state.Roles ==="Pembeli"){
          return <NavbarPembeli/>;
        }else{
          return <NavbarAwal/>;
        }

      }else if(register(newUser)){
        if(this.state.Roles==="Penjual"){
          return <NavbarPenjual/>;
        }else if(this.state.Roles ==="Pembeli"){
          return <NavbarPembeli/>;
        }else{
          return <NavbarAwal/>;
        }
      }else{
        return <NavbarAwal/>;
      }
}

}
export default App;