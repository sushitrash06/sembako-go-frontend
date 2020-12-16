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
import Navbar from '../../Component/NavbarAdmin';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
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

class Pembeli extends React.Component{
    constructor(){
        super()
        this.state={
            row:[],
        }
    }
     componentDidMount(){
        var header = new Headers();
        header.append("Content-Type","application/json");
        fetch(`http://localhost:4000/Users/Admin/User/Pembeli`,{
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
    <div>
        <Navbar/>
    <div className="container">
        <br/>
        <div><h3>Daftar Semua User</h3></div>
    <div className="container">
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">id user</StyledTableCell>
            <StyledTableCell align="right">Nama Pengguna</StyledTableCell>
            <StyledTableCell align="right">Username</StyledTableCell>
            <StyledTableCell align="right">Alamat</StyledTableCell>
            <StyledTableCell align="right">Kota</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {row.map(rows => (
            <StyledTableRow key={row.name}>
                <StyledTableCell align="right">{rows.id_user}</StyledTableCell>
                <StyledTableCell align="right">{rows.Nama_pengguna}</StyledTableCell>
                <StyledTableCell align="right">{rows.Username}</StyledTableCell>
                <StyledTableCell align="right">{rows.Alamat}</StyledTableCell>
                <StyledTableCell align="right">{rows.Kota}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </div>
    </div>
  );
}
}
Pembeli.PropsTypes={
    classes: PropsTypes.object.isRequired,
};
export default withStyles(styles)(Pembeli);