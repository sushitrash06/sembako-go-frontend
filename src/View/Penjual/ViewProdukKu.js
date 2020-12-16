import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import {Form,Row, Col} from 'react-bootstrap';
import PropsTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import jwt_decode from 'jwt-decode';
import Kosong from './kosong';

const styles = theme=>({
root: {
    maxWidth: 345,
},
media:{
    height: 140,
},
});

class ViewProdukKu extends React.Component{
    constructor(){
        super()
        this.state={
            items:[],
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
    componentDidMount(){
        this.ShowData();
    }

render(){
    const {classes} = this.props;
    const {items}=this.state;
return(
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
             Stock : {produks.Jumlah_stock} {produks.id_user}
            </Typography>
            </CardContent>
        </CardActionArea> 
</Card>
&ensp;&ensp;
</Col>
</div>
)): <div><Kosong/></div>}
</Row>
</Form>
</div>
)}}
ViewProdukKu.propTypes = {
classes: PropsTypes.object.isRequired,
};

export default withStyles(styles)(ViewProdukKu);

