import React,{Component} from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
// import { Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import {Card, Button } from 'react-bootstrap';
// import Grid from '@material-ui/core/Grid';
import history from '../history';
import Link from 'react-bootstrap/NavLink';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ReportIcon from '@material-ui/icons/Report';
import jwt_decode from 'jwt-decode';
import Kosong from '../View/Penjual/kosong';
import {Form,Row, Col} from 'react-bootstrap';
import PropsTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
const styles = theme=>({
    root:{
        maxWidth: 345,
    },
    media:{
        height: 140,
    },
});

class PreviewProduk extends Component{
    constructor(){
        super()
        this.state={
            beras:[],
            minyak:[],
            ModalProdukPreview : false,
            ModalProdukAddToCart : false,
        }
    }
    ModalLaporkan =()=>{
        this.setState({ModalLaporkan: !this.state.ModalLaporkan})
    }
    showDataBeras=()=>{
        var header = new Headers();
            header.append("Content-Type","application/json");
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
                                        {produks.Nama_toko} <Link onClick={() => history.push('/Login')}>{produks.Username}</Link>
                                </Typography>
                                </CardContent>
                            </CardActionArea> 
                            <CardActions>
                            <Button style={{color:'#fe9801'}} variant="fab" size="lg" onClick={() => history.push('/Login')}><AddShoppingCartIcon/></Button>
                            {" "}
                            <Button  variant="fab" size="lg" onClick={() => history.push('/Login')}><ReportIcon/></Button>
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
        </div> 
    )}
}
PreviewProduk.propTypes = {
    classes: PropsTypes.object.isRequired,
};
export default withStyles(styles)(PreviewProduk);