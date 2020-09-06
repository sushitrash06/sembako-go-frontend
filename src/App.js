import React from 'react';
import './App.css';
import 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';  
import NavbarAwal from './Component/NavbarAwal';
import jwt_decode from 'jwt-decode';
import 'react-bootstrap';
import NavbarPembeli from './Component/NavbarUser';
import NavbarPenjual from './Component/NavbarPenjual';
import { login, register } from './View/UserFunctions';
import Routes from './Router';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      Roles: "",
    };
  }
  componentDidUpdate(prevProps) { 
    const token=localStorage.getItem('usertoken');
    const decoded = jwt_decode(token);
      console.log('previous prop', prevProps);
      if (this.state!== decoded.Roles) {
          this.setState({
            Roles:this.state.Roles
          })
          if(token===null){
            return (
          <div id="root">
            <NavbarAwal/>
            <Routes/>
          </div>
            ) 
          }
      }
  }
  render() { 
  //  const token=localStorage.getItem('usertoken');
    //const decoded = jwt_decode(token);
    //console.log(decoded)
    console.log(this.state.Roles)
    if (this.state.Roles === "Penjual") {
      return (
        <div className="App">
          <NavbarPenjual/>
          <Routes/>
      </div>
      )
    } else if (this.state.Roles === "Pembeli") {
      return (
    <div className="App">
      <NavbarPembeli/>
      <Routes/>
    </div>
      )
    } else {
      return (
      <div>
       <NavbarAwal/>
       <Routes/>
      </div>
      )
    } 
  }
}
export default App