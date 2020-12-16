import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarPenjual from '../../Component/NavbarPenjual';
import { Button } from 'react-bootstrap';
import ProdukList from './ProdukList1';
import history from '../../../src/history';
class EditProduk extends React.Component{
    render(){
        return(
            <div>
                <NavbarPenjual/>
                <div className="container">
                    <br/>
                    <br/>
                <Button variant="contained" onClick={() => history.push('/TambahProduk')} className="btn btn-info btn-lg">Tambah Produk</Button>
                <ProdukList/>
                </div>
            </div>
        )
    }
}
export default EditProduk; 