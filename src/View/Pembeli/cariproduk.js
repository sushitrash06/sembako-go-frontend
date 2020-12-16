import React from 'react'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Link from 'react-bootstrap/NavLink';
import { Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import {Form,Row, Col, Card,Button} from 'react-bootstrap';
import PropsTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import history from '../../history';
// import Navbar from '../../Component/NavbarUser';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ReportIcon from '@material-ui/icons/Report';
import Minyak from './RekomendasiProduk';

const style = theme=>({
    root:{
        maxWidth: 345,
    },
    media:{
        height: 140,
    },
    margin: {
        margin: theme.spacing(1),
      },
    
});

class cariproduk extends React.Component{
    constructor(){
        super()
        this.state={
            items:[],
            produk:[],
            ModalProdukPreview : false,
            ModalProdukAddToCart : false,
            ModalLaporkan : false,
            Cari:'Beras',
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
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
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
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
      }
    onSubmit(){
        var header = new Headers();
        header.append("Content-Type","application/json");
        fetch(`http://localhost:4000/product/cari/${this.state.Cari}`,{
            method:"GET",
            header:header,
        })
        .then(res=> res.json())
        .then(
            (result)=>{
                this.setState({
                    id_produk: this.state.form.id_produk,
                    items: result,
                    isLoaded: true
                });
                console.log(this.state.Cari)
            },(error)=>{
                this.setState((error));
                console.log("Hasil Error Tidak Ditemukan" + error)
            }
        )
    }
    AddToCart =()=>{
        const newCart = {
            id_produk: this.state.form.id_produk,
            id_user:this.state.form.id_user,
            Nama_toko:this.state.form.Nama_toko,
            Username:this.state.form.Username,
            Nama_Produk:this.state.form.Nama_Produk,
            Price:this.state.form.Price,
            Deskripsi:this.state.form.Deskripsi,
            status_keranjang:this.state.form.status_keranjang
        }
        axios.post('http://localhost:4000/keranjang/addtocart',newCart)
        .then(response=>{            
            this.componentDidMount(); 
            this.ModalCart();
        })
    }
    selectCart=(produks)=>{
        const token = localStorage.getItem('usertoken')
        const decoded = token ? jwt_decode(token) : null;
        this.setState({
            typemodal: 'updated',
            form:{
                id_produk: produks.id_produk,
                id_user:decoded.id_user,
                Nama_toko:produks.Nama_toko,
                Username:produks.Username,
                Nama_Produk:produks.Nama_Produk,
                Price:produks.Price,
                Deskripsi:produks.Deskripsi,
                status_keranjang:produks.status_keranjang,
                StatusBarang: produks.StatusBarang
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
            console.log(this.state.form.id_produk)
            axios.put('http://localhost:4000/product/laporkan/'+this.state.form.id_produk,newProduk,config).then(response=>{
                console.log(newProduk)
                this.ModalLaporkan();
            }).catch(error=>{
                console.log('error laporkan produk'+error)
            })
    
    }
    handleChange=async e=>{
        e.persist();
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            } 
        });
        console.log(this.state.image);
    }
    componentDidMount(){
       this.onSubmit();
    }
    render(){
        const {items,form}=this.state;
        const {classes}= this.props;
        return(
            <div>
                <div className={classes.margin}>
                    <form>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <IconButton onClick={this.onSubmit}>
                                <SearchIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item>
                        <TextField
                            id="standard-basic"
                            name="Cari"
                            label="Cari Produk"
                            type="TextField"
                            fullWidth
                            onChange={this.onChange}
                            value={this.state.Cari}
                            autoComplete="given-name"
                            />
                        </Grid>
                    </Grid>
                </form>
        </div>
        <div className="container">
                <Form
                    container
                    direction = "row"
                    style={{display:'flex'}}
                    spacing={2}
                >
                <Row>
                    {items && items.length > 0 ? items.map(produks=>(
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
                    )): <div></div>}
                    </Row>
                    </Form>
             </div>
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
                <button className="btn btn-primary" onClick={()=>this.AddToCart()}>Ya</button>
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
        )
    }

}
cariproduk.propTypes ={
    classes: PropsTypes.object.isRequired,
};
export default withStyles(style)(cariproduk);