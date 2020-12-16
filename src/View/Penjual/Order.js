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
import { Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import IconButton from '@material-ui/core/IconButton';
import { Form } from 'react-bootstrap';

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

class Order extends React.Component{
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
     ShowData=()=>{
        const token = localStorage.getItem('usertoken')
        const decoded = jwt_decode(token)
        this.setState({
            Username: decoded.Username,
        })
        var header = new Headers();
        header.append("Content-Type","application/json");
            console.log(decoded.Username)
        fetch(`http://localhost:4000/pesanan/penjual/${decoded.Username}`,{
            method:"GET",
            header:header,
        })
        .then(res=> res.json())
        .then(
            (result)=>{
            this.setState({
                id_pesanan: this.state.id_pesanan,
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
      componentDidMount(){
          this.ShowData();
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
  const {form,row} = this.state;

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
          </TableRow>
        </TableHead>
        <TableBody>
          {row.map(pesanans => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="right">{pesanans.id_pesanan}</StyledTableCell>
              <StyledTableCell align="right">{pesanans.Tgl_order}</StyledTableCell>
              <StyledTableCell align="right">{pesanans.Nama_pembeli}</StyledTableCell>
              <StyledTableCell align="right">{pesanans.pesanan}</StyledTableCell>
              <StyledTableCell align="right">{pesanans.Total_bayar}</StyledTableCell>
              <StyledTableCell align="right">{pesanans.jumlah_pesanan}</StyledTableCell>
              <StyledTableCell align="right">{pesanans.Alamat_kirim}</StyledTableCell>
              <StyledTableCell align="right">{pesanans.Nomer_hp}</StyledTableCell>
              <StyledTableCell align="right">{pesanans.Catatan}</StyledTableCell>
              <StyledTableCell align="right">{pesanans.Status}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Modal isOpen={this.state.ModalEdit}>
                    <ModalHeader style={{display:'block'}}>
                        <span style={{float:'right'}} onClick={()=>this.ModalEdit()}></span>
                    </ModalHeader> 
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
Order.PropsTypes={
    classes: PropsTypes.object.isRequired,
};
export default withStyles(styles)(Order);