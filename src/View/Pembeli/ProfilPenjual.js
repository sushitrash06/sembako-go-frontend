import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from '@material-ui/core/Button';
import history from '../../../src/history';
import {Form, Row, Col, Card} from 'react-bootstrap';
import { Paper } from '@material-ui/core';
import NavbarUser from '../../Component/NavbarUser';
import PropsTypes from 'prop-types';
import jwt_decode from 'jwt-decode';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Kosong from '../Penjual/kosong';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Link from 'react-bootstrap/NavLink';
import axios from 'axios';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { Modal, ModalFooter, ModalHeader,ModalBody} from 'reactstrap'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ReportIcon from '@material-ui/icons/Report';
const styles = theme =>({
    root:{
        maxWidth: 345,
    },
    media:{
        height: 140,
    }
})
class ProfilUser extends React.Component{
    constructor(){
        super()
        this.state={
            ModalSuccess:false,
            ModalLaporkan:false,
            User: [],
            produk:[],
            ModalCart : false,
            StatusBarang:'Blokir',
            form:{
                id_produk:'',
                Nama_Produk:'',
                Price:'',
                Username:'',
                Nama_toko:'',
                Deskripsi:'',
                status_keranjang:'dalam keranjang',
                StatusBarang:'Blokir',
                typeModal: '',
                
            }
        }
    }
    ModalSuccess=()=>{
        this.setState(({ModalSuccess: !this.state.ModalSuccess}))
    }
    ModalCart =()=>{
        this.setState({ModalCart: !this.state.ModalCart})
    }
    ModalLaporkan =()=>{
        this.setState({ModalLaporkan: !this.state.ModalLaporkan})
    }
    showUser=()=>{
        const Username = this.props.match.params.Username
        var header = new Headers();
            header.append("Content-Type","application/json");
            console.log(Username) 
        fetch(`http://localhost:4000/Users/Penjual/User/${Username}`,{
            method: "GET",
            header:header,
        }).then(res=>res.json())
        .then(
            (result)=>{
                this.setState({
                    User:result,
                    isLoaded: true,
                });
                console.log(result)   
            },(error) =>{
                this.setState((error));
                console.log(error)
            })
    }
    showProdukUser=()=>{
        const Username= this.props.match.params.Username
        var header = new Headers();
            header.append("Content-Typle","application/json");
            console.log(Username)
        fetch(`http://localhost:4000/product/Username/${Username}`,{
            method:"GET",
            header: header,
        }).then(res=>res.json())
        .then(
            (result)=>{
                this.setState({
                    produk: result, 
                    isLoaded: true
                });
                console.log(result)
            },
            (error)=>{
                this.setState((error));
                console.log(error)
            })
    }
    componentDidMount =()=>{
        this.showProdukUser();
        this.showUser();
    }
    selectCart=(produks)=>{
        const token = localStorage.getItem('usertoken')
        const decoded = token ? jwt_decode (token) : null;
        this.setState({
            typeModal: 'update',
            form:{
                id_produk:produks.id_produk,
                id_user:decoded.id_user,
                Nama_Produk:produks.Nama_Produk,
                Price:produks.Price,
                Username:produks.Username,
                Nama_toko:produks.Nama_toko,
                Deskripsi:produks.Deskripsi,
                status_keranjang:'dalam keranjang'
            }
        })
    }
    addtocart =()=>{
        const newCart = {
            id_produk: this.state.form.id_produk,
            id_user: this.state.form.id_user,
            Nama_Produk:this.state.form.Nama_Produk,
            Price:this.state.form.Price,
            Username:this.state.form.Username, 
            Nama_toko:this.state.form.Nama_toko,
            Deskripsi:this.state.form.Deskripsi,
            status_keranjang:this.state.form.status_keranjang,
        }
        axios.post('http://localhost:4000/keranjang/addtocart', newCart)
        .then(response =>{
          this.ModalSuccess();
          this.componentDidMount(); 
          this.ModalCart();
        })
    }
    handleChange= async e=>{
        e.persist();
    await this.setState({
        form:{
            ...this.state.form,
            [e.target.name]: e.target.value
        }
    })
    }
    LaporkanBarang=()=>{
        const newProduk = new FormData();
            newProduk.append ("StatusBarang",this.state.StatusBarang);
            const config = {
                headers: {
                    'content-type' : 'multipart/form-data'
                }
            }
            console.log(this.state.StatusBarang)
            axios.put('http://localhost:4000/product/laporkan/'+this.state.form.id_produk,newProduk,config).then(response=>{
                console.log(newProduk)
                this.ModalLaporkan();
            }).catch(error=>{
                console.log('error laporkan produk'+error)
            })
    
    }
    render(){
        const {form,User,produk}=this.state;
        const {classes}= this.props;
        return(
<div style={{margin:"0px"}}>
  <NavbarUser/> 
    <div>
        <div style={{margin:"0px"}}>
                <Paper style={{backgroundColor:"#96d6b1"}}>
                <Form>
                    <Row className="container">
                    <Col>
                     <div className="container">
                        <br/>
                        <h2 style={{color:"#ffff"}}>Toko {User.Nama_toko}</h2>
                        <h4 style={{color:"#ffff"}}>{User.Username}</h4>
                        <h4 style={{color:"#ffff"}}><LocationOnOutlinedIcon/>{User.Kota}</h4>
                    </div>
                    </Col>
                    <Col>
                    <br/>
                    <div>
                        <img align="right"style={{width:"50%"}} src={`http://localhost:4000${User.Foto}`} alt="gambar"/>
                    </div>
                    </Col>
                    </Row>
                </Form>
                <br/>
                <br/>
                </Paper>
                </div>
                    <br/>
                    <h1 className="container"> Produk</h1>
                    <div style={{float:"left", marginTop:"30px"}}>
                <Form
                    className="container"
                    direction = "row"
                    style = {{display:'flex'}}
                    spacing={2}
                >
                    <Row>
                        {produk && produk.length > 0 ? produk.map(produks=>(
                            <div>
                                <Col> 
                                  <Card className={classes.root}> 
                                  <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={`http://localhost:4000${produks.image}`}
                                    title="gambar"
                                    alt="gambar"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {produks.Nama_Produk}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                kode produk : {produks.id_produk} <br/>                                    
                                              {produks.Price}<br/>                               
                                              {produks.Deskripsi}<br/>
                                Stock : {produks.Jumlah_stock} <br/>
                                        {produks.Nama_toko} <Link onClick={()=> history.push(`/Users/${produks.Username}`)}>{produks.Username}</Link>
                                </Typography>
                                </CardContent>
                            </CardActionArea> 
                            <CardActions>
                            <Button style={{color:'#fe9801'}} variant="fab" size="lg" onClick={()=> {this.selectCart(produks); this.ModalCart()}}><AddShoppingCartIcon/></Button>
                            {" "}
                                    <Button  variant="fab" size="lg" onClick={()=>{this.selectCart(produks); this.setState({ModalLaporkan:true})}}><ReportIcon/></Button>
                            </CardActions>
                                  </Card>
                                  &ensp;&ensp;
                                </Col> 
                            </div>
                        )): <div><Kosong/></div>}
                    </Row>
                </Form>
            </div>                        
                
        </div> 
        <div>
            <Modal isOpen={this.state.ModalCart}>
            <ModalHeader style={{display:'block'}}>
                <h4>Masukan barang dibawah ini kedalam keranjang?</h4>
                <span style={{float:'right'}} onClick={()=>this.ModalCart()}></span>
            </ModalHeader>
            <ModalBody>
            <Form className="container">
                <Form.Group controlId="formPlaintextEmail">
                    <Form.Label>
                        <b>Nama&nbsp;Produk :</b>
                        </Form.Label>
                    <Form.Control plaintext readOnly onChange={this.handleChange} defaultValue={form?form.Nama_Produk:''}/>
                </Form.Group>
                <Form.Group controlId="formPlaintextEmail">
                    <Form.Label>
                    <b>Id&nbsp;produk&nbsp;&nbsp; :</b>
                    </Form.Label>
                    <Form.Control plaintext readOnly onChange={this.handleChange} defaultValue={form?form.id_produk:''} />
                </Form.Group>
                <Form.Group controlId="formPlaintextEmail">
                    <Form.Label>
                    <b>Price&nbsp;&nbsp; </b>
                    </Form.Label>
                    <Form.Control plaintext readOnly onChange={this.handleChange} defaultValue={form?form.Price:''} />
                </Form.Group>
                <Form.Group controlId="formPlaintextEmail">
                    <Form.Label>
                    <b>Nama&nbsp;Toko&nbsp;&nbsp;</b>
                    </Form.Label>
                    <Form.Control plaintext readOnly onChange={this.handleChange} defaultValue={form?form.Nama_toko:''} />
                </Form.Group>
                <Form.Group controlId="formPlaintextEmail">
                    <Form.Label>
                   <b> Username&nbsp;Toko&nbsp;&nbsp; :</b>
                    </Form.Label>
                    <Form.Control plaintext readOnly onChange={this.handleChange} defaultValue={form?form.Username:''} />
                </Form.Group>
                <Form.Group controlId="formPlaintextEmail">
                    <Form.Label>
                    <b>Deskripsi&nbsp;barang&nbsp;&nbsp;</b>
                    </Form.Label>
                    <Form.Control plaintext readOnly onChange={this.handleChange} defaultValue={form?form.Deskripsi:''} />
                </Form.Group>
                </Form>
            </ModalBody>
                <ModalFooter>
                <button className="btn btn-primary" onClick={()=>this.addtocart()}>Ya</button>
                <button className="btn btn-danger" onClick={()=>this.ModalCart()}>Cancel</button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={this.state.ModalLaporkan}>
                    <ModalBody>
                        Apakah Kamu ingin Melaporkan Produk ini? {form && form.Nama_Produk}
                    </ModalBody> 
                <ModalFooter>
                    <button className="btn btn-danger" onClick={()=>this.LaporkanBarang()}>Ya</button>
                    <button className="btn btn-secondary" onClick={()=>this.setState({ModalLaporkan:false})}>Tidak</button>
                </ModalFooter>
                </Modal>
            
        </div>
        <Modal isOpen={this.state.ModalSuccess}>
         <ModalBody onClick={()=>this.ModalSuccess()}>
            Sukses! <CheckCircleIcon 
                style={{ 
                color:'#49e35d',fontSize: 30 
                }}/>
                </ModalBody>
        </Modal>
</div>
        )
    }
}
ProfilUser.propTypes ={
    classes: PropsTypes.object.isRequired
};
export default withStyles(styles)(ProfilUser);