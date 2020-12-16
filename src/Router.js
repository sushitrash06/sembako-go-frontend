import React, {Component} from "react";
import {Router, Switch, Route, withRouter } from "react-router-dom";
import Home from "../src/View/TampilanAwal";
import history from "./history";
//import LoginPembeli from "./View/Login/LoginPembeli";
import Login from "./View/Login/Login";
import Register from "./View/Penjual/Register";
import profile from "./Component/LandingTester";
//import Landing from "./Component/Landing";
import DashboardPenjual from "./View/Penjual/DashboardPenjual";
import DashboardPembeli from "./View/Pembeli/DashboardPembeli";
import TambahProduk from './View/Penjual/TambahProduk';
import HalamanAwal from './View/Pembeli/HalamanAwal';
import EditProduk from './View/Penjual/EditProduk';
import Order from './View/Penjual/TabOrder';
import ProfilPenjual from './View/Penjual/Profil';
import User from './View/Pembeli/ProfilPenjual';
import EditProfilPenjual from './View/Penjual/EditProfilPenjual' 
import Terlarang from './View/Admin/Terlarang';
import Blokir from './View/Admin/Blokir';
import DaftarUSer from './View/Admin/DaftarUser';
import Cari from './View/Pembeli/TabCari';
import Keranjang from './View/Pembeli/Keranjang';
import Checkout from './View/Pembeli/Checkout';
import OrderPembeli from './View/Pembeli/TabOrderUser';
import EditProfilUser from './View/Pembeli/EditUserPembeli';
import Admin from './View/Admin/AdminLogin';
import AdminHome from './View/Admin/DashboardAdmin';
import SemuaUser from './View/Admin/DaftarUser';
import PembeliUser from './View/Admin/Pembeli';
import PenjualUser from './View/Admin/Penjual';


class Routes extends Component{
  
    render(){
        
        return(
            <Router history={history}>
                <Switch>
                    <Route path ="/" exact component={Home}/>
                    <Route path="/home" exact component={Home}/>
                    <Route path="/Login" component={Login}/> 
                    <Route path = "/Register" component={Register}/>
                    <Route path ="/profile" component={profile}/>
                    <Route path ="/DashboardPenjual" component={DashboardPenjual}/>
                    <Route path = "/DashboardPembeli" component={DashboardPembeli}/>
                    <Route path = "/TambahProduk" component={TambahProduk}/>
                    <Route path = "/HalamanAwal" component={HalamanAwal}/>
                    <Route path = "/EditProduk" component={EditProduk}/>
                    <Route path = "/Orderan" component={Order}/>
                    <Route path ="/ProfilePenjual" component={ProfilPenjual}/>
                    <Route path ="/Users/:Username" component={User}/>
                    <Route path ="/Penjual/EditProfil" component={EditProfilPenjual}/>
                    <Route path ="/EditProfil/User" component={EditProfilUser}/>
                    <Route path ="/Terlarang" component={Terlarang}/>
                    <Route path ="/Blokir" component={Blokir}/>
                    <Route path ="/SemuaUser" component={DaftarUSer}/>
                    <Route path ="/Cari/Produk" component={Cari}/>
                    <Route path ="/Keranjang" component={Keranjang}/>
                    <Route path ="/Checkout/:id_keranjang" component={Checkout}/>
                    <Route path ="/Pembeli/Orderan" component={OrderPembeli}/>
                    <Route path ="/Admin" component={Admin}/>
                    <Route path ="/AdminHome" component={AdminHome}/>
                    <Route path ="/SemuaUser" component={SemuaUser}/>
                    <Route path ="/UserPembeli" component={PembeliUser}/>
                    <Route path ="/UserPenjual" component={PenjualUser}/>
                </Switch>
            </Router>
        ) 
    
    }
}


export default withRouter(Routes);
