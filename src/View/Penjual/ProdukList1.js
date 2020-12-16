import React,{Component} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {Card, Button } from 'react-bootstrap';
// import Grid from '@material-ui/core/Grid';
import jwt_decode from 'jwt-decode';
import Kosong from './kosong';
import {Form,Row, Col} from 'react-bootstrap';
import PropsTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import gambar1 from './tidak_ada.png';

const styles = theme=>({
    root: {
        maxWidth: 345,
    },
    media:{
        height: 140,
    },
});

class ProdukList1 extends Component{
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
            typeModal:'',  
        }
    }
}

    ShowData=()=>{
        const token = localStorage.getItem('usertoken')
        const decoded = jwt_decode(token)
        this.setState({
            id_user: decoded.id_user,
        })
    var header = new Headers();
        header.append("Content-Type","application/json");
            console.log(decoded.id_user)
        fetch(`http://localhost:4000/product/View/${decoded.id_user}`,{
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
        const newProduk= new FormData();
        newProduk.append ("id_user",this.state.form.id_user);
        newProduk.append("Nama_toko",this.state.form.Nama_toko);
        newProduk.append("Username",this.state.form.Username);
        newProduk.append("Nama_Produk", this.state.form.Nama_Produk);
        newProduk.append("Price",this.state.form.Price);
        newProduk.append("image", this.state.form.image);
        newProduk.append("Deskripsi", this.state.form.Deskripsi);
        newProduk.append("Jumlah_stock", this.state.form.Jumlah_stock);
        const config = {
            headers: {
                'content-type' : 'multipart/form-data'
            }
        }
        axios.put('http://localhost:4000/product/editproduk/'+this.state.form.id_produk,newProduk,config).then(response=>{
            this.ModalInsert();
            this.ShowData();
            console.log(newProduk)
        }).catch(error=>{
            console.log('error update data'+error)
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
  
    handleChange=async e=>{
        e.persist();
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.name === "image" ? e.target.files[0] : e.target.value          
            }
        });
        console.log(this.state.image);
    }
    componentDidMount(){
        this.ShowData();
    }
    selectProduk=(produks)=>{
        this.setState({
            typeModal: 'updated',
            form:{
                id_produk:produks.id_produk,
                id_user:produks.id_user,
                Nama_toko:produks.Nama_toko,
                Username:produks.Username,
                Nama_Produk:produks.Nama_Produk,
                Price:produks.Price,
                Deskripsi: produks.Deskripsi,
                Jumlah_stock: produks.Jumlah_stock,
            }
        })
    }
    render(){
        const {form,items,edit}=this.state;
        const {classes} = this.props;
        return(
            <div>
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
                                            {produks.Price}<br/>                               
                                            {produks.Deskripsi}<br/>
                                Stock : {produks.Jumlah_stock} {produks.id_user}
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
                    <ModalHeader style={{display:'block'}}>
                        <span style={{float:'right'}} onClick={()=>this.ModalInsert()}></span>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="id_produk">ID</label>
                            <input className="form-control" type="text" name="id_produk" id="id_produk" readOnly onChange={this.handleChange} value={form?form.id_produk: ''}/>
                            <br/>
                            <label htmlFor="Nama_Produk">Nama Produk</label>
                            <input className="form-control" type="text" name="Nama_Produk" id="Nama_Produk"  onChange={this.handleChange} value={form?form.Nama_Produk: ''}/>
                            <br/>
                            <label htmlFor="Price">Harga Barang</label>
                            <input className="form-control" type="text" name="Price" id="Price"  onChange={this.handleChange} value={form?form.Price: ''}/>
                            <br/>
                            <label htmlFor="Jumlah_stock">Jumlah Stock</label>
                            <input className="form-control" type="text" name="Jumlah_stock" id="Jumlah_stock"  onChange={this.handleChange} value={form?form.Jumlah_stock: ''}/>
                            <br/>
                            <label htmlFor="Deskripsi">Deskripsi Barang</label>
                            <input className="form-control" type="text" name="Deskripsi" id="Deskripsi"  onChange={this.handleChange} value={form?form.Deskripsi: ''}/>
                            <br/>
                            <label htmlFor="image">Gambar(di mohon kembali mengupload gambar)</label>
                            <input className="form-control" type="file" name="image" id="image"  onChange={this.handleChange} value={this.state.image}/>
                            <br/>
                            <label disabled htmlFor="Nama_toko">Nama_toko</label>
                            <input disabled className="form-control" type="text" name="Nama_toko" id="Nama_toko"  onChange={this.handleChange} value={form?form.Nama_toko: ''}/>
                            <label disabled htmlFor="id_user">id_user</label>
                            <input disabled className="form-control" type="text" name="id_user" id="id_user"  onChange={this.handleChange} value={form?form.id_user: ''}/>
                            <label disabled htmlFor="Username">Username</label>
                            <input disabled className="form-control" type="text" name="Username" id="Username"  onChange={this.handleChange} value={form?form.Username: ''}/>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-primary" onClick={()=>this.UpdateData()}>
                            Update
                        </button>
                        <button className="btn btn-danger" onClick={()=>this.ModalInsert()}>Cancel</button>
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
ProdukList1.propTypes = {
    classes: PropsTypes.object.isRequired,
    };
export default withStyles(styles)(ProdukList1);