import React,{Component} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
// import { Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {Card, Button } from 'react-bootstrap';
// import Grid from '@material-ui/core/Grid';
import history from '../../../src/history';
import Link from 'react-bootstrap/NavLink';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ReportIcon from '@material-ui/icons/Report';
import jwt_decode from 'jwt-decode';
import Kosong from '../Penjual/kosong';
import {Form,Row, Col} from 'react-bootstrap';
import PropsTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Modal, ModalFooter, ModalHeader,ModalBody} from 'reactstrap';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
const styles = theme=>({
    root:{
        maxWidth: 345,
    },
    media:{
        height: 140,
    },
});

class ProdukView extends Component{
    constructor(){
        super()
        this.state={
            beras:[],
            minyak:[],
            ModalProdukPreview : false,
            ModalProdukAddToCart : false,
            StatusBarang:'Blokir',
            form:{
                id_produk:'',
                id_user:'',
                Nama_toko:'',
                Username:'',
                Nama_Produk: '',
                Price:'',
                Deskripsi: '',
                status_keranjang: 'dalam keranjang',
                StatusBarang:'Blokir',
                typeModal:'',
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
    showDataBeras=()=>{
        const token = localStorage.getItem('usertoken')
        const decoded = jwt_decode(token)
        this.setState({
            id_user:decoded.id_user,
        })
        var header = new Headers();
            header.append("Content-Type","application/json");
            console.log(decoded.id_user)
        fetch(`http://localhost:4000/product/cari/Beras`,{
            method:"GET",
            header: header,
        })
        .then(res=> res.json())
        .then(
            (result)=>{
                this.setState({
                    id_produk: this.state.id_produk,
                    beras: result,
                    isLoaded: true
                });
                console.log(result)
            },
            (error)=>{
                this.setState((error));
                console.log(error)
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
    componentDidMount(){
        this.showDataBeras();
    }
render(){
    const {form,beras} = this.state;
    const {classes}=this.props;
    return(
        <div className="container">
            <div>
                <div>
                    <h2>Beras</h2>
                </div>
                <Form
                    direction = "row"
                    style = {{display:'flex'}}
                    spacing={2}
                >
                    <Row>
                        {beras && beras.length > 0 ? beras.map(produks=>(
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
                                Stock : {produks.Jumlah_stock} 
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
            <br/>
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
    )}
}
ProdukView.propTypes = {
    classes: PropsTypes.object.isRequired,
};
export default withStyles(styles)(ProdukView);