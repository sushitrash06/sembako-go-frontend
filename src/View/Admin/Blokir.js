import React,{Component} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {Card, Button } from 'react-bootstrap';
// import Grid from '@material-ui/core/Grid';
import jwt_decode from 'jwt-decode';
import Kosong from '../../View/Penjual/kosong';
import {Form,Row, Col} from 'react-bootstrap';
import PropsTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Navbar from '../../Component/NavbarAdmin'

const styles = theme=>({
    root: {
        maxWidth: 345,
    },
    media:{
        height: 140,
    },
});

class Blokir extends Component{
    constructor(){
        super()
        this.state={
            items:[],
            ModalInsert : false,
            ModalDelete : false,
        form:{
            id_produk:'',
            id_user:'',
            Nama_toko:'',
            Username:'',
            Nama_Produk: '',
            Price:'',
            image: '',
            Deskripsi: '',
            Jumlah_stock: '',
            StatusBarang:'Aman',
            typeModal:'',  
        }
    }
}

    ShowData=()=>{
    var header = new Headers();
        header.append("Content-Type","application/json");
        fetch(`http://localhost:4000/product/cari/blokir/Blokir`,{
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

    UpdateData=()=>{
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
            this.ModalInsert();
            this.componentDidMount();
        }).catch(error=>{
            console.log('error laporkan produk'+error)
        })

    }
    DeleteData=()=>{
        axios.delete('http://localhost:4000/product/'+this.state.form.id_produk).then(response=>{
            this.setState({
                ModalDelete: false
            })
            this.ShowData();
        }) 
    }
    ModalInsert=()=>{
        this.setState({ModalInsert: !this.state.ModalInsert})
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
    componentDidMount(){
        this.ShowData();
    }
    selectProduk=(produks)=>{
        this.setState({
            typeModal: 'updated',
            form:{
                id_produk:produks.id_produk,
                Nama_Produk:produks.Nama_Produk,
                Deskripsi: produks.Deskripsi,
                StatusBarang:'Aman'
            }
        })
    }
    render(){
        const {form,items,edit}=this.state;
        const {classes} = this.props;
        return(
            <div>
                <Navbar/>
                <div  style ={{ float: "left", marginTop:"30px"}}>
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
                                              {produks.Deskripsi}<br/>
                                              {produks.StatusBarang}
                                </Typography>
                                </CardContent>
                            </CardActionArea> 
                            <CardActions>
                                    <Button className="btn btn-info btn-lg" size="lg" onClick={()=> {this.selectProduk(produks); this.ModalInsert()}}>Edit</Button>
                                    {" "}
                                    <Button  variant="danger" size="lg" onClick={()=>{this.selectProduk(produks); this.setState({ModalDelete:true})}}>Hapus</Button>
                        </CardActions>
                    </Card>
                    &ensp;&ensp;
                    </Col>
                    </div>
                    )): <div><Kosong/></div>}
                    </Row>
                    </Form>
             </div>
                <Modal isOpen={this.state.ModalInsert}>
                <ModalBody>
                        Apakah Kamu ingin Melaporkan Produk ini? {form && form.Nama_Produk}
                    </ModalBody> 
                <ModalFooter>
                    <button className="btn btn-danger" onClick={()=>this.UpdateData()}>Ya</button>
                    <button className="btn btn-secondary" onClick={()=>this.setState({ModalLaporkan:false})}>Tidak</button>
                </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.ModalDelete}>
                    <ModalBody>
                        Apakah Kamu ingin Menghapus Produk ini? {form && form.Nama_Produk}
                    </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={()=>this.DeleteData()}>Ya</button>
                    <button className="btn btn-secondary" onClick={()=>this.setState({ModalDelete:false})}>No</button>
                </ModalFooter>
                </Modal>
            </div>
        );
        
    }
}
Blokir.propTypes = {
    classes: PropsTypes.object.isRequired,
    };
export default withStyles(styles)(Blokir);