import React from 'react'; 
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {withStyles} from '@material-ui/core/styles';
import PropsTypes from 'prop-types';
import jwt_decode from 'jwt-decode';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import IconButton from '@material-ui/core/IconButton';
import { Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import { Form } from 'react-bootstrap';
import axios from 'axios';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#ffe775",
    color: "#52575d",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const styles = theme=>({
  table: {
    minWidth: 700,
  },
});

class OrderDikirim extends React.Component{
    constructor(){
        super()
        this.state={
            row:[],
            ModalEdit: false,
            form:{
                id_pesanan:'',
                Status: '',
            }
        }
    }
     componentDidMount(){
        const token = localStorage.getItem('usertoken')
        const decoded = jwt_decode(token)
        this.setState({
            Username: decoded.Username,
        })
        var header = new Headers();
        header.append("Content-Type","application/json");
            console.log(decoded.id_user)
        fetch(`http://localhost:4000/pesanan/penjual/${decoded.id_user}/status/Dikirim`,{
            method:"GET",
            header:header,
        })
        .then(res=> res.json())
        .then(
            (result)=>{
            this.setState({
                id_produk: this.state.id_produk,
                row: result,
                isLoaded: true
            });
        console.log(result)
        },
        (error) =>{
            this.setState((error));
            console.log(error)
        })
     }
     yesnoCheck(){
      if (document.getElementById("dikirim").checked){
        this.state.form.Status="Diterima"
      }else{
        this.state.form.Status="Dikirim"
      }
    }
    UpdateStatus=()=>{
      const PesananData ={
         Status: this.state.form.Status,
      }
      axios.put('http://localhost:4000/pesanan/editpesanan/'+this.state.form.id_pesanan,PesananData).then(response=>{
          this.ModalEdit();
          this.ShowData();
      })
  }
  ModalEdit=()=>{
    this.setState({ModalEdit: !this.state.ModalEdit})
}
handleChange= e=>{
    e.persist();
    this.setState({
        form:{
            ...this.state.form,
             [e.target.name]: e.target.value,
        }
    })
}
selectPesanan=(pesanans)=>{
  this.setState({
      typeModal: 'updated',
      form:{
        id_pesanan:pesanans.id_pesanan,
        Status: pesanans.Status,
      }
  })
} 
render(){
  const {classes} = this.props
  const {row,form} = this.state;

  return (
    <div>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">id_pesanan</StyledTableCell>
            <StyledTableCell align="right">Tanggal Order</StyledTableCell>
            <StyledTableCell align="right">Nama Pembeli</StyledTableCell>
            <StyledTableCell align="right">Pesanan</StyledTableCell>
            <StyledTableCell align="right">Total bayar</StyledTableCell>
            <StyledTableCell align="right">Jumlah Pesanan</StyledTableCell>
            <StyledTableCell align="right">Alamat Kirim</StyledTableCell>
            <StyledTableCell align="right">No Hp</StyledTableCell>
            <StyledTableCell align="right">Catatan</StyledTableCell>
            <StyledTableCell align="right">status</StyledTableCell>
            <StyledTableCell align="right">Edit Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row.map(rows => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="right">{rows.id_pesanan}</StyledTableCell>
              <StyledTableCell align="right">{rows.Tgl_order}</StyledTableCell>
              <StyledTableCell align="right">{rows.Nama_pembeli}</StyledTableCell>
              <StyledTableCell align="right">{rows.pesanan}</StyledTableCell>
              <StyledTableCell align="right">{rows.Total_bayar}</StyledTableCell>
              <StyledTableCell align="right">{rows.jumlah_pesanan}</StyledTableCell>
              <StyledTableCell align="right">{rows.Alamat_kirim}</StyledTableCell>
              <StyledTableCell align="right">{rows.Nomer_hp}</StyledTableCell>
              <StyledTableCell align="right">{rows.Catatan}</StyledTableCell>
              <StyledTableCell align="right">{rows.Status}</StyledTableCell>
              <StyledTableCell align="right"><IconButton aria-label="delete" onClick={()=> {this.selectPesanan(pesanans); this.ModalEdit()}}><EditRoundedIcon></EditRoundedIcon></IconButton></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Modal isOpen={this.state.ModalEdit}>
        <ModalHeader style={{display:'block'}}>
          <span style={{float:'right'}} onClick={()=>this.ModalEdit()}></span>                    </ModalHeader> 
            <ModalBody>
              <div className="form-group">
                   <label htmlFor="id_pesanan">ID pesanan</label>
                      <input className="form-control" type="text" name="id_pesanan" id="id_pesanan" readOnly onChange={this.handleChange} value={form?form.id_pesanan: ''}/>
                            <br/>
                            <label>Kirim barang ini? </label> &nbsp;&nbsp;
                            <Form>
                            <Form.Group controlId="dikirim">
                                  <Form.Check value="dikirim" id ="dikirim" controlId="dikirim" type="checkbox" label="dikirim" onClick={this.yesnoCheck} onChange={this.handleChange} />
                              </Form.Group>
                            </Form>
                            
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-primary" onClick={()=>this.UpdateStatus()}>
                            Update
                        </button>
                        <button className="btn btn-danger" onClick={()=>this.ModalEdit()}>Cancel</button>
                    </ModalFooter>
                </Modal>

    </div>
  );
}
}
OrderDikirim.PropsTypes={
    classes: PropsTypes.object.isRequired,
};
export default withStyles(styles)(OrderDikirim);