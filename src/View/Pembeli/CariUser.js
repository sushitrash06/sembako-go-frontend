import React from 'react'
import Link from 'react-bootstrap/NavLink';
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
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ReportIcon from '@material-ui/icons/Report';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

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

class CariUser extends React.Component{
    constructor(){
        super()
        this.state={
            items:[],
            Cari:'',
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
      }
    onSubmit(){
        var header = new Headers();
        header.append("Content-Type","application/json");
        fetch(`http://localhost:4000/Users/finduser/user/${this.state.Cari}`,{
            method:"GET",
            header:header,
        })
        .then(res=> res.json())
        .then(
            (result)=>{
                this.setState({
                    items: result,
                    isLoaded: true
                });
                console.log(this.state.Cari)
            },(error)=>{
                this.setState((error));
                console.log("Hasil Error" + error)
            }
        )
    }    
    componentDidMount(){
       this.onSubmit();
    }
    render(){
        const {items,form,produk}=this.state;
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
                    {items && items.length > 0 ? items.map(users=>(
                    <div>
                        <Col>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={`http://localhost:4000${users.Foto}`}
                                    title="gambar"
                                    alt="gambar"
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {users.Nama_toko}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                 <LocationOnOutlinedIcon/>: {users.Kota} <br/>                                    
                                    <Link onClick={()=> history.push(`/Users/${users.Username}`)}>{users.Username}</Link> 
                                </Typography>
                                </CardContent>
                            </CardActionArea> 
                            <CardActions>
                        </CardActions>
                    </Card>
                    &ensp;&ensp;
                    </Col> 
                    </div>
                    )): <div></div>}
                    </Row>
                    </Form>
             </div>
            </div>
        )
    }

}
CariUser.propTypes ={
    classes: PropsTypes.object.isRequired,
};
export default withStyles(style)(CariUser);