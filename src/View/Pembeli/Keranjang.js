import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button } from '@material-ui/core/Button';
import {Form, Row, Col,Button} from 'react-bootstrap';
import Navbar from '../../Component/NavbarUser'
import Card from '@material-ui/core/Card';
import PropsTypes from 'prop-types';
import jwt_decode from 'jwt-decode';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Kosong from '../Penjual/kosong';
import history from '../../../src/history';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import gambar from '../../img/Shoping_bag.png'
import { Modal, ModalFooter, ModalBody,ModalHeader} from 'reactstrap';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';


const styles = theme =>({
    root:{
        maxWidth:450,
        display: 'flex' 
    },
    details:{
        display: 'flex',
        flexDirection: 'column',
    },   
    content: {
        flex: '1 0 auto',
      },
      cover: {
        width: 151,
        float:'right',
        height:151,
      },
      controls: {
        display: 'flex',
      },
      Icon: {
        height: 38,
        width: 38,
      },
})
class Keranjang extends React.Component{
    constructor(){
        super()
        this.state={
            Order:[],
            ModalOrder : false,
            ModalDelete : false,
            form:{
                id_keranjang:'',    
            }
        }
    }

showCart=()=>{
    const token = localStorage.getItem('usertoken')
    const decoded = token ? jwt_decode(token):null;
    this.setState({
        id_user:decoded.id_user,
    })
    var header = new Headers();
        header.append("Content-Type","application/json");
            console.log(decoded.id_user)
        fetch(`http://localhost:4000/keranjang/user/${decoded.id_user}/status/dalam Keranjang`,{
            method:"GET",
            header:header,
        })
        .then(res=> res.json())
        .then(
            (result)=>{
            this.setState({ 
                Order: result,
                id_keranjang:result.id_keranjang,
                isLoaded: true
            });
        console.log(result)
        },
        (error) =>{
            this.setState((error));
            console.log(error)
        })
    }

    deleteCart=()=>{
        axios.delete('http://localhost:4000/keranjang/delete/'+this.state.form.id_keranjang)
        .then(response=>{
            this.setState({
                ModalDelete: false
            })
            this.componentDidMount();
        })
    }
    componentDidMount=()=>{
        this.showCart();
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
    selectProduk=(keranjangs)=>{
        this.setState({
            typeModal: 'updated',
            form:{
                id_keranjang:keranjangs.id_keranjang
            }
        })
    }
    render(){
        const {Order,form}=this.state;
        const {classes}=this.props;
        return(
            <div style={{margin:"0px"}}>
                <Navbar/>
                <div className="container">
                    <br/>
                        <h2>Keranjang ku</h2>
                        <br/>
                    {Order && Order.length > 0 ? Order.map(keranjangs=>( 
                    <div>
                    <Card className={classes.root}>
                    <div className={classes.details} >
                        <CardContent className={classes.content}>
                            <Typography variant="h5" component="h2">
                                <b>#{keranjangs.id_keranjang}&nbsp;&nbsp;&nbsp;&nbsp;{keranjangs.Nama_Produk}</b>
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                            {keranjangs.Username}&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;{keranjangs.Nama_toko}
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                          {keranjangs.Deskripsi}
                          </Typography>
                          <Typography variant="h5" component="h2">
                                <b>{keranjangs.Price}</b>
                            </Typography>
                        </CardContent>
                        <div className={classes.controls}>
                                <IconButton variant="fab" size="lg" style={{color:'#fdc93a'}} onClick={()=> history.push(`/Checkout/${keranjangs.id_keranjang}`)}>
                                    <AddShoppingCartIcon/>
                                </IconButton>
                                <IconButton  variant="fab" size="lg" onClick={()=>{this.selectProduk(keranjangs); this.setState({ModalDelete:true})}}>
                                    <DeleteIcon/>
                                </IconButton>
                                </div>
                            </div>
                            <img
                                className="right"
                                src={gambar}
                                alt="gambar"
                                style={{maxWidth:'50%'}}
                                // title="Produk"
                            />
                    </Card>
                    <br/>
                    </div>
                    )):<div><Kosong/></div>}
                <div>
            <Modal isOpen={this.state.ModalDelete}>
                    <ModalBody>
                        Hapus keranjang ini? {form && form.Nama_Produk}
                    </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={()=>this.deleteCart()}>Ya</button>
                    <button className="btn btn-secondary" onClick={()=>this.setState({ModalDelete:false})}>No</button>
                </ModalFooter>
                </Modal>
            </div>
        </div>
            </div>
        )
    }

}
Keranjang.propTypes ={
    classes: PropsTypes.object.isRequired
};
export default withStyles(styles)(Keranjang);