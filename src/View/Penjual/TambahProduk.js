import React from 'react'
import jwt_decode from 'jwt-decode';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarPenjual from '../../Component/NavbarPenjual';
import {addproduk} from '../../View/UserFunctions';
import { Form,Col, Button } from 'react-bootstrap';


class TambahProduk extends React.Component{
    constructor(){
        super()
        this.state={
            id_user:'',
            Nama_toko:'',
            Nama_produk: '',
            Harga:'',
            image: '',
            Deskripsi: '',
            Jumlah_produk: '',
            error:{}
        }
        this.onChange=this.onChange.bind(this)
        this.onSubmit=this.onSubmit.bind(this)
    }
    componentDidMount(){
    const token = localStorage.getItem('usertoken')
    const decoded= token ? jwt_decode(token) : null;
        this.setState({
            id_user:decoded ? decoded.id_user : null,
            Nama_toko: decoded ? decoded.Nama_toko : null
        })
        console.log(decoded.id_user)
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    onSubmit(e){
        e.preventDefault()
        const newProduk={
            id_user:this.state.id_user,
            Nama_produk: this.state.Nama_produk,
            Nama_Toko: this.state.Nama_toko,
            Harga:this.state.Harga,
            image: this.state.image,
            Deskripsi: this.state.Deskripsi,
            Jumlah_produk: this.state.Jumlah_produk,
        }
        addproduk(newProduk).then((res)=>{
            this.getAll() 
            //localStorage.setItem('usertoken',res.data.token);
            if(res){
            this.props.history.push(`/DashboardPenjual`)
            }else{
                alert("Gagal tambah produk")
            }
                }).catch(err=>{
                    console.log(err)
            })
    }
    
    render(){
        return(
            <div>
                <NavbarPenjual/>
                <h2>Tambah Produk</h2>
                <Form className="container"style={{marginTop:28}}> 
                    <Form.Row controlId="exampleForm.ControlInput1">
                        <Form.Label column lg={2}>
                            Nama Produk  
                        </Form.Label>
                        <br/>
                        <Col>
                            <Form.Control 
                            type="text" 
                            placeholder="Masukan Nama Produk"
                            name="Nama_produk"
                            value={this.state.Nama_produk}
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
                            name="Harga"
                            value={this.state.Harga}
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
                            name="Jumlah_produk"
                            value={this.state.Jumlah_produk}
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
                        label="Example file input" 
                        accept="image/*"
                        type="image"
                        name="Image"
                        value={this.state.image}
                        onChange={this.onChange}
                        />
                        </Form.Group>
                    </Form.Row>
                    <br/>
                    <Form.Row style={{visibility: "hidden"}}controlId="exampleForm.ControlInput1">
                        <Col>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <br/>
                            <Form.Control 
                            as="textarea" 
                            rows="3"
                            name="Deskripsi"
                            value={this.state.id_user}
                            onChange={this.onChange}
                            />
                        </Form.Group>    
                        </Col>
                    </Form.Row>
                    <Button
                        type="submit"
                        className="btn btn-lg btn-primary btn-block"
                    >Submit</Button>
                </Form>
            </div>
        )
    }
}
export default TambahProduk;