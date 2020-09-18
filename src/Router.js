import React, {Component} from "react";
import {Router, Switch, Route, withRouter } from "react-router-dom";
import Home from "../src/View/TampilanAwal";
import history from "./history";
//import LoginPembeli from "./View/Login/LoginPembeli";
import Login from "./View/LoginIndex";
import LoginPenjual from "./View/Login/Login";
import RegisterPenjual from "./View/Penjual/Register";
import profile from "./Component/LandingTester";
//import Landing from "./Component/Landing";
import DashboardPenjual from "./View/Penjual/DashboardPenjual";
import DashboardPembeli from "./View/Pembeli/DashboardPembeli";
import TambahProduk from './View/Penjual/TambahProduk';

class Routes extends Component{
  /*constructor() {
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
              Roles:decoded.Roles
            })
        }
    } */
    render(){
       /*console.log(this.props, 'asd');
        const token=localStorage.getItem('usertoken');
        const renderNavBar = () => {
            if (!token) {
              return <NavbarAwal />
            }
          //  const decoded = jwt_decode(token);
            if (this.state.Roles === "Penjual") {
              return <NavbarPenjual />;
            } else if (this.state.Roles === "Pembeli") {
              return <NavbarPembeli />;
            } else {
              return <NavbarAwal />;
            }
          } */
        
        return(
            <Router history={history}>
                <Switch>
                    <Route path ="/" exact component={Home}/>
                    <Route path="/home" exact component={Home}/>
                    <Route path="/Login" component={Login}/> 
                    <Route path = "/RegisterPenjual" component={RegisterPenjual}/>
                    <Route path ="/LoginPenjual" component={LoginPenjual}/>
                    <Route path ="/profile" component={profile}/>
                    <Route path ="/DashboardPenjual" component={DashboardPenjual}/>
                    <Route path = "/DashboardPembeli" component={DashboardPembeli}/>
                    <Route path = "/TambahProduk" component={TambahProduk}/>
                </Switch>
            </Router>
        )
    
    }
}


export default withRouter(Routes);