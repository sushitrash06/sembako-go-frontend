import React, {Component} from 'react';
import {Card, CardGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import jwt_decode from 'jwt-decode';

class ProdukList extends Component{
    constructor(props){
        super(props);
        this.state = {
            items:[],
            isLoaded: false
        }
    }
    componentDidMount(){
    const token = localStorage.getItem('usertoken')
    const decoded = jwt_decode(token)
    this.setState({
      id_user: decoded.id_user,
    })
    console.log(decoded.id_user)
        fetch(`http://localhost:4000/product/?id_user=${decoded.id_user}`)
        .then(res=> res.json())
        .then(
            (result)=>{
            this.setState({
                items: result,
                isLoaded: true
            });
        console.log(result)
        },
        (error) =>{
            this.setState((error));
            console.log(error)
        }
        )
    }
    render(){
        console.log(this.state.items)
        var{isLoaded,items}=this.state;
        if(!isLoaded){
            return<div>Loading.......</div>
        }else{
            return(
                <div className="ProdukList">
                    {items && items.length > 0 ? items.map(item =>(
                    <CardGroup>
                             <Card style={{width: '18rem'}} key={item.id_produk}>
                                 <Card.Img variant="top" src={item.image} alt="img"></Card.Img>
                               <Card.Body>
                                   <Card.Title>
                                    {item.Nama_produk}
                                   </Card.Title> 
                                   <Card.Text>
                                       {item.Price}<br/>
                                       {item.Deskripsi}
                                   </Card.Text>
                                   <Card.Footer>
                                    <small className="text-muted">Stock : {item.Jumlah_stock}</small>
                                   </Card.Footer>
                               </Card.Body>  
                             </Card>
                    </CardGroup>
                    )) : 'Kosong'}
                    {console.log(items)}
                </div>
            )
        }
    }
}
export default ProdukList;