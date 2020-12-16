import React from 'react';
// import { withStyles, makeStyles } from '@material-ui/core/style';
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
      backgroundColor: theme.palette.background.paper,
    },
  },
}))(TableRow);


const styles = theme=>({
  table: {
    minWidth: 700,
  },
});

class SemuaOrderan extends React.Component{
    constructor(){
        super()
        this.state={
            row:[],
        }
    }
     componentDidMount(){
        const token = localStorage.getItem('usertoken')
        const decoded = jwt_decode(token)
        this.setState({
            id_user: decoded.id_user,
        })
        var header = new Headers();
        header.append("Content-Type","application/json");
            console.log(decoded.id_user)
        fetch(`http://localhost:4000/pesanan/pembeli/ ${decoded.id_user}`,{
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
render(){
  const {classes} = this.props
  const {row} = this.state;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}  aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">id_pesanan</StyledTableCell>
            <StyledTableCell align="center">Tanggal Order</StyledTableCell>
            <StyledTableCell align="center">Nama Toko</StyledTableCell>
            <StyledTableCell align="center">Pesanan</StyledTableCell>
            <StyledTableCell align="center">Harga</StyledTableCell>
            <StyledTableCell align="center">Jumlah Pesanan</StyledTableCell>
            <StyledTableCell align="center">Total bayar</StyledTableCell>
            <StyledTableCell align="center">Alamat Kirim</StyledTableCell>
            <StyledTableCell align="center">No Hp</StyledTableCell>
            <StyledTableCell align="center">Catatan</StyledTableCell>
            <StyledTableCell align="center">status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row.map(rows => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="center">{rows.id_pesanan}</StyledTableCell>
              <StyledTableCell align="left">{rows.Tgl_order}</StyledTableCell>
              <StyledTableCell align="right">{rows.Nama_toko}</StyledTableCell>
              <StyledTableCell align="left">{rows.pesanan}</StyledTableCell>
              <StyledTableCell align="left">{rows.Price}</StyledTableCell>
              <StyledTableCell align="left">{rows.jumlah_pesanan}</StyledTableCell>
              <StyledTableCell align="left">{rows.Total_bayar}</StyledTableCell>
              <StyledTableCell align="left">{rows.Alamat_kirim}</StyledTableCell>
              <StyledTableCell align="left">{rows.Nomer_hp}</StyledTableCell>
              <StyledTableCell align="left">{rows.Catatan}</StyledTableCell>
              <StyledTableCell align="left">{rows.Status}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
}
SemuaOrderan.PropsTypes={
    classes: PropsTypes.object.isRequired,
};
export default withStyles(styles)(SemuaOrderan);