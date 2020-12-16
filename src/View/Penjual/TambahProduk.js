import React from 'react'
import jwt_decode from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarPenjual from '../../Component/NavbarPenjual';
import axios from 'axios'
import { Form,Col } from 'react-bootstrap';


class TambahProduk extends React.Component{
    constructor(){
        super()
        this.state={
            id_user:'',
            Nama_toko:'',
            Username:'',
            Nama_produk: '',
            Harga:'',
            image: '',
            Deskripsi: '',
            Jumlah_produk: '',
            StatusBarang:'aman',
            error:{}
        }
        this.onChange=this.onChange.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
    }
    componentDidMount(){
        const token = localStorage.getItem('usertoken')
        const decoded= token ? jwt_decode(token) : null;
        this.setState({
            id_user:decoded.id_user,
            Nama_toko:decoded.Nama_toko,
            Username:decoded.Username
        })
    }
    onSubmit(e){
        e.preventDefault()
        const newProduk= new FormData();
        newProduk.append ("id_user",this.state.id_user);
        newProduk.append("Nama_toko",this.state.Nama_toko);
        newProduk.append("Username",this.state.Username);
        newProduk.append("Nama_Produk", this.state.Nama_Produk);
        newProduk.append("Price",this.state.Price);
        newProduk.append("image", this.state.image);
        newProduk.append("Deskripsi", this.state.Deskripsi);
        newProduk.append("Jumlah_stock", this.state.Jumlah_stock);
        newProduk.append("StatusBarang", this.state.StatusBarang);
        const config = {
            headers: {
                'content-type' : 'multipart/form-data'
            }
        } 
        console.log(newProduk)
        axios.post('product/addproduk', newProduk,config)
            .then((response)=>{
                this.props.history.push(`/DashboardPenjual`);
            }).catch((err)=>{
                console.log(err)
            })
    }
    onChange(e){
        this.setState({
            [e.target.name]: e.target.name === "image"? e.target.files[0] : e.target.value          
        })
    }
    render(){
        return(
            <div>
                <NavbarPenjual/>
                
                <Form className="container"style={{marginTop:28}}  noValidate onSubmit={this.onSubmit}> 
                    <h2>Tambah Produk</h2>
                    <Form.Row controlId="exampleForm.ControlInput1">
                        <Form.Label column lg={2}>
                            Nama Produk  
                        </Form.Label>
                        <br/>
                        <Col>
                            <Form.Control 
                            type="text" 
                            placeholder="Masukan Nama Produk"
                            name="Nama_Produk"
                            value={this.state.Nama_Produk}
                            onChange={this.onChange}
                            />
                        </Col>
                    </Form.Row>
                    <br/> 
                    <Form.Row controlId="exampleForm.ControlInput1">
                        <Form.Label column lg={2}>
                            Harga Produk 
                        </Form.Label>
                        <br/>
                        <Col>
                            <Form.Control type="text" 
                            placeholder="Masukan Harga Produk"
                            name="Price"
                            value={this.state.Price}
                            onChange={this.onChange}
                            />
                        </Col>
                    </Form.Row>
                    <br/>
                    <Form.Row controlId="exampleForm.ControlInput1">
                        <Form.Label column lg={2}>
                            Jumlah Produk
                        </Form.Label>
                        <br/>
                        <Col>
                            <Form.Control 
                            type="text" 
                            placeholder="Masukan Jumlah Produk"
                            name="Jumlah_stock"
                            value={this.state.Jumlah_stock}
                            onChange={this.onChange}
                            />
                        </Col>
                    </Form.Row>
                    <br/>
                    <Form.Row controlId="exampleForm.ControlInput1">
                        <Col>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Deskripsi Produk</Form.Label>
                            <br/>
                            <Form.Control 
                            as="textarea" 
                            rows="3"
                            name="Deskripsi"
                            value={this.state.Deskripsi}
                            onChange={this.onChange}
                            />
                        </Form.Group>    
                        </Col>
                    </Form.Row>
                    <br/>
                    <Form.Row controlId="exampleForm.ControlInput1">
                        <Form.Group>
                        <Form.File 
                        id="exampleFormControlFile1" 
                        label="Masukan Foto Produk" 
                        type="image"
                        name="image"
                        value={this.setState.image}
                        onChange={this.onChange}
                        />
                        </Form.Group>
                    </Form.Row>
                    <br/>
                    <button 
                        type="submit"
                        className="btn btn-lg btn-primary btn-block"
                    >Submit</button>
                    <Form.Row controlId="exampleForm.ControlInput1" style={{ visibility: "hidden" }}>
                        <Col>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <br/>
                            <Form.Control 
                            as="text" 
                            name="id_user"
                            value={this.state.id_user}
                            onChange={this.onChange}
                            />
                        </Form.Group>    
                        </Col>
                    </Form.Row>
                    <Form.Row controlId="exampleForm.ControlInput1" style={{ visibility: "hidden" }}>
                        <Col>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <br/>
                            <Form.Control disabled
                            as="area" 
                            name="Nama_toko"
                            value={this.state.Nama_toko}
                            onChange={this.onChange}
                            />
                        </Form.Group>    
                        </Col>
                    </Form.Row>
                    <Form.Row controlId="exampleForm.ControlInput1" style={{ visibility: "hidden" }}>
                        <Col>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <br/>
                            <Form.Control disabled
                            as="area" 
                            name="Username"
                            value={this.state.Username}
                            onChange={this.onChange}
                            />
                        </Form.Group>    
                        </Col>
                    </Form.Row>

                </Form>
            </div>
        )
    }
}
export default TambahProduk;