import React, {Component} from 'react';
import {Card, Alert, Container, Modal, Button,Form,Col} from 'react-bootstrap';
import Grid from '@material-ui/core/Grid';
import 'bootstrap/dist/css/bootstrap.min.css';
import jwt_decode from 'jwt-decode';
import Kosong from './kosong';
import gambar1 from './tidak_ada.png';
import axios from 'axios'


/*class Kosong extends Component{
    render(){
        return(
            <div className="container">
                <img src={gambar1} alt="gambar1" style={{display:"block",marginLeft:"auto",marginRight:"auto"}}>
                </img>
            </div>
        )
    }
}*/


class ProdukList extends Component{
    constructor(props){
        super(props);
        this.state = {
            id_user:'',
            Nama_toko:'',
            Nama_Produk: '',
            Price:'',
            image: '',
            Deskripsi: '',
            Jumlah_produk: '',
            showAlert: false,
            alertMsg:'',
            alertType:"success",
            items:[],
            isLoaded: false,
            show: false,
        };
        this.handleOpen=this.handleOpen.bind(this)
        this.handleClose=this.handleClose.bind(this)
        this.updateData=this.updateData.bind(this)
    }
    
    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.name === "image"? e.target.files[0] : e.target.value          
        })
    }
    handleClose(){
        this.setState({
            show:false
        })
    }
    handleOpen(){
        this.setState({
            show:true
        })
    }
    componentWillMount(){
        this.componentDidMount();
    }
    componentDidMount(){
    const token = localStorage.getItem('usertoken')
    const decoded = jwt_decode(token)
    this.setState({
      id_user: decoded.id_user,
    })
    var header = new Headers();
        header.append("Content-Type","application/json");
    console.log(decoded.id_user)
        fetch(`http://localhost:4000/product/${decoded.id_user}`,{
            method:"GET",
            header:header,
        })
        .then(res=> res.json())
        .then(
            (result)=>{
            this.setState({
                id_produk: this.state.id_produk,
                items: result,
                isLoaded: true
            });
        console.log(result)
        },
        (error) =>{
            this.setState((error));
            console.log(error)
        })
    }
    editData=(id_produk)=>{
        this.setState({
            id_produk:id_produk
        })
        this.handleOpen();
        fetch("http://localhost:4000/product/cariproduk/"+id_produk,{
            method:"GET",
        })
        .then((response)=> response.json())
        .then((result)=>{
            console.log(result);
            this.setState({
                // id_produk:id_produk,
                id_user:result.response[0].id_user,
                Nama_toko:result.response[0].Nama_toko,
                Nama_Produk:result.response[0].Nama_Produk,
                Price:result.response[0].Price,
                image: '',
                Deskripsi:result.response[0].Deskripsi,
                Jumlah_stock:result.response[0].Jumlah_stock,
            })
        }).catch((error)=> console.log("error",error));
    }
    updateData(e){
        e.preventDefault()
        const newProduk= new FormData();
        newProduk.append ("id_user",this.state.id_user);
        newProduk.append("Nama_toko",this.state.Nama_toko)
        newProduk.append("Nama_Produk", this.state.Nama_Produk);
        newProduk.append("Price",this.state.Price);
        newProduk.append("image", this.state.image);
        newProduk.append("Deskripsi", this.state.Deskripsi);
        newProduk.append("Jumlah_stock", this.state.Jumlah_stock);
        const config = {
            headers: {
                'content-type' : 'multipart/form-data'
            }
        }
        console.log(newProduk)
        axios.put(`product/editproduk/${this.state.id_produk}`, newProduk,config)
        .then((response)=>{
            this.componentDidMount();
        }).catch((err)=>{
            console.log('error update',err)
        })
    }
    deleteData=(id_produk)=>{
        fetch("http://localhost:4000/product/"+id_produk,{
            method:"DELETE",
        })
            .then((response)=>response.json())
            .then((result)=>{
                this.setState({
                    showAlert: true,
                    alertMsg: "Produk Terhapus",
                    alertType: "danger",
                });
                this.componentDidMount();
            })
            .catch((error)=> console.log("error",error))
    }
    
    render(){
        var{isLoaded,items}=this.state;
        if(!isLoaded){
            return<div>
                <img src={gambar1} alt="gambar1" style={{display:"block",marginLeft:"auto",marginRight:"auto"}}>
                </img>
                </div>
        }else{
            return(
            <div> 
                <div>
                    <Container>
                        {this.state.showAlert === true ? (
                            <Alert
                                variant={this.state.alertType}
                                onClose={()=>{
                                    this.setState({
                                        showAlert: false,
                                    });
                                }}
                                dismissible
                                >
                                    <Alert.Heading>{this.state.alertMsg}</Alert.Heading>
                            </Alert>
                        ): null}
                    </Container>
                </div>
                <div  style ={{ float: "left", marginTop:"30px"}}>
                    <Grid
                    container
                    direction = "row"
                    style={{display:'flex'}}
                    >
                       {items && items.length > 0 ? items.map(item =>(
                             <Card style={{width:"30%",flexWrap:"nowrap"}}>
                                 <Card.Img variant="top"  style={{width:"50%",display:"block",marginLeft:"auto",marginRight:"auto"}} src={`http://localhost:4000${item.image}`} alt="img"></Card.Img>
                               <Card.Body style={{height:"auto",}}>
                                   <Card.Title>
                                    {item.Nama_Produk}
                                   </Card.Title> 
                                   <Card.Text>
                                       kode produk : {item.id_produk} <br/>
                                       {item.Price}<br/>
                                       {item.Deskripsi}<br/>
                                       Stock : {item.Jumlah_stock} {this.state.id_user}
                                   </Card.Text>
                                   <Card.Footer>
                                   <Grid container direction="row">
                                        <Button variant="danger" onClick={()=> this.deleteData(item.id_produk)}>Hapus</Button>
                                        <Button type="button" className="btn btn-info btn-lg" onClick={()=>this.editData(item.id_produk)}>Edit</Button>
                                    </Grid>
                                   </Card.Footer>
                               </Card.Body>  
                             </Card>
                             )) : <Kosong style={{display:"block",marginLeft:"auto",marginRight:"auto"}}/>}
                    </Grid>
                </div>
                <div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Edit Produk
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Form className="container"style={{marginTop:28}}> 
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
                            onChange={this.handleChange}
                            />
                        </Col>
                    </Form.Row>
                    <br/> 
                    <Form.Row controlId="exampleForm.ControlInput1">
                        <Form.Label column lg={2}>
                            Price Produk 
                        </Form.Label>
                        <br/>
                        <Col>
                            <Form.Control type="text" 
                            placeholder="Masukan Price Produk"
                            name="Price"
                            value={this.state.Price}
                            onChange={this.handleChange}
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
                            onChange={this.handleChange}
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
                            onChange={this.handleChange}
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
                        onChange={this.handleChange}
                        />
                        </Form.Group>
                    </Form.Row>
                    <br/>
                    <Form.Row controlId="exampleForm.ControlInput1" style={{ visibility: "hidden" }}>
                        <Col>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <br/>
                            <Form.Control 
                            as="text" 
                            name="id_user"
                            value={this.state.id_user}
                            onChange={this.handleChange}
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
                            onChange={this.handleChange}
                            />
                        </Form.Group>    
                        </Col>
                    </Form.Row>
                </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={this.updateData}>Test</Button>
                        </Modal.Footer>
                </Modal>
                </div>
            </div>
            )
        }
    }
}
export default ProdukList;