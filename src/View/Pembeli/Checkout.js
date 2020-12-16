import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import Navbar from '../../Component/NavbarUser';
import PropsTypes from 'prop-types';
import jwt_decode from 'jwt-decode';
import {Form,Button} from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Label } from 'reactstrap';
import { Modal, ModalBody} from 'reactstrap';

const styles = theme =>({
    listItem: {
        padding: theme.spacing(1, 0),
      },
      total: {
        fontWeight: 700,
      },
      title: {
        marginTop: theme.spacing(2),
      },
})

class Checkout extends React.Component{
    constructor(){
        super()
        this.state={
            Cart:[],
            ModalSuccess : false,
            id_keranjang:'',
            id_user:'',
            Username:'',
            pesanan:'',
            Nama_pengguna:'',
            Nama_toko: '',
            Price: 0,
            Total_bayar: 0,  
            jumlah_pesanan:0,
            Alamat_kirim: '', 
            Nomer_hp: '',
            Catatan: '',
            Status: 'Belum dikirim',      
            errors: {}      
            }
            this.onChange = this.onChange.bind(this)
            this.AddOrder = this.AddOrder.bind(this)
        }
        ModalSuccess=()=>{
            this.setState(({ModalSuccess: !this.state.ModalSuccess}))
        } 
        incrementCount = () => {
            this.setState({ jumlah_pesanan: this.state.jumlah_pesanan + 1 }, () =>
              this.componentDidMount()
            );
          };
        
          decrementCount = () => {
            this.setState({ jumlah_pesanan: this.state.jumlah_pesanan - 1 }, () =>
              this.componentDidMount()
            );
          };
        componentDidMount =()=>{
            const token = localStorage.getItem('usertoken')
            const decoded= token ? jwt_decode(token) : null;
            this.setState({
                id_user:decoded.id_user,
                Nama_pengguna:decoded.Nama_pengguna
            })
            const id_keranjang= this.props.match.params.id_keranjang
            var header = new Headers();
                header.append("Content-Type","application/json");
                    // console.log(decoded.id_user)
                fetch(`http://localhost:4000/keranjang/view/${id_keranjang}`,{
                    method:"GET",
                    header:header,
                })
                .then(res=> res.json())
                .then(
                    (result)=>{
                    this.setState(()=>({ 
                        id_keranjang:result.id_keranjang,
                        Cart: result,
                        Price:result.Price,
                        isLoaded: true,
                        id_user:result.id_user,
                        Username: result.Username,
                        pesanan: result.Nama_Produk ,
                        Nama_toko: result.Nama_toko,

                    }));
                    this.setState((prevState)=>({
                        Total_bayar: prevState.Price * prevState.jumlah_pesanan
                    }))
                console.log(this.state.Total_bayar)
                },
                (error) =>{
                    this.setState((error));
                    console.log(error)
                })   
            }
            onChange(e) {
                this.setState({ [e.target.name]: e.target.value })
              }
            deleteCart(){
                    axios.delete('http://localhost:4000/keranjang/delete/'+this.state.id_keranjang)
                    .then(response=>{
                        console.log("delete sukses :"+this.state.id_keranjang)
                    }).catch((err)=>{
                        console.log("delete failed")
                    })
            }
            AddOrder(){
                const newOrder ={
                        id_user:this.state.id_user,
                        Username: this.state.Username,
                        pesanan: this.state.pesanan,
                        Nama_pengguna:this.state.Nama_pengguna,
                        Nama_toko: this.state.Nama_toko,
                        Price:this.state.Price,
                        Total_bayar: this.state.Total_bayar,
                        jumlah_pesanan: this.state.jumlah_pesanan,
                        Alamat_kirim: this.state.Alamat_kirim,
                        Nomer_hp: this.state.Nomer_hp,   
                        Catatan: this.state.Catatan,
                        Status: this.state.Status,
                }
                axios.post('http://localhost:4000/pesanan/tambah_pesanan',newOrder)
                .then(response=>{
                    this.ModalSuccess();
                    this.deleteCart();
                    this.props.history.push(`/Pembeli/Orderan`)
                    console.log(newOrder)
                }).catch((err)=>{
                    console.log(err)
                })
            
        }
        render(){
            const {Cart} = this.state;
            const {classes}= this.props;
            return(
                <div style={{margin:"0px"}}>
                <Navbar/>
                <Form className="container">
                    <br/>
                    <Typography variant="h6" gutterBottom>
                        Order
                    </Typography>
                    <List disablePadding>
                        <ListItem className={classes.listItem} key={Cart.Nama_Produk}>
                            <ListItemText primary={Cart.Nama_Produk} secondary={Cart.Deskripsi}/>
                            <ListItemText secondary={Cart.Username} primary={Cart.Nama_toko}/>
                            <br/>
                            <Typography variant="body2"><b>Harga &nbsp;&nbsp;</b>: {Cart.Price}</Typography>
                        </ListItem>
                        <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="standard-basic"
                            name="Alamat_kirim"
                            label="Alamat Kirim"
                            type="TextField"
                            fullWidth
                            onChange={this.onChange}
                            value={this.state.Alamat_kirim}
                            autoComplete="given-name"
                        />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="standard-read-only-input"
                            name="Nama_pengguna"
                            label="Nama Anda"
                            fullWidth
                            InputProps={{
                                readOnly: true,
                              }}
                            value={this.state.Nama_pengguna}
                            onChange={this.onChange}
                            autoComplete="family-name"
                        />
                        </Grid>
                        <Grid item xs={12}>
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            id="standard-basic"
                            type="TextField"
                            name="Nomer_hp"
                            label="Masukan Nomer hp"
                            fullWidth
                            value={this.state.Nomer_hp}
                            onChange={this.onChange}
                            autoComplete="shipping address-line2"
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            id="standard-basic"
                            type="TextField"
                            name="Catatan"
                            label="Masukan Catatan"
                            fullWidth
                            value={this.state.Catatan}
                            onChange={this.onChange}
                            autoComplete="shipping address-line2"
                        />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Label>{this.state.jumlah_pesanan}&nbsp;&nbsp;&nbsp;</Label>
                            <Button onClick={this.incrementCount}> + </Button>&nbsp;&nbsp;
                            <Button onClick={this.decrementCount}> - </Button>
                        </Grid>
                    </Grid>
                        <ListItem className={classes.listItem}>
                            <ListItemText primary="Total Harga"/>
                            <Typography variant="subtitle1" className={classes.total}>
                                {this.state.Total_bayar}
                            </Typography>
                        </ListItem>
                    </List>
                    <Button variant="success" size="lg" block onClick={()=>this.AddOrder()}>
                        Order!
                    </Button>
                    </Form>
                    <div>
                    <Modal isOpen={this.state.ModalSuccess}>
                        <ModalBody onClick={()=>this.ModalSuccess()}>
                            Sukses! <CheckCircleIcon 
                                style={{ 
                                color:'#49e35d',fontSize: 30 
                                }}/>
                                </ModalBody>
                        </Modal>
                    </div>
                    
                </div>
            )
        }
}
Checkout.propTypes ={
    classes: PropsTypes.object.isRequired
};
export default withStyles(styles)(Checkout);