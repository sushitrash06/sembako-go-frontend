import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const register = newUser => {
    return axios
    .post('Users/register',{
        Nama: newUser.Nama,
        Nama_toko: newUser.Nama_toko,
        Username: newUser.Username,
        Password: newUser.Password,
        Alamat: newUser.Alamat,
        Roles:newUser.Roles
    })
    .then(res => {
        console.log("Registed")
        return res;
        //console.log(produk)
    })
    .catch(err => {
        console.log(err);
        return err;
    })
}

export const login = user =>{
    return axios
    .post('Users/login', {
        Username: user.Username,
        Password: user.Password,
        //Roles: user.Roles
    })
    .then(res =>{ 
        console.log(res.data);
        localStorage.setItem('usertoken',res.data)
        return res.data
    })
    .catch(err =>{
        console.log('err', err);
        return err;
    })
}
export const addproduk = produk =>{
    return axios
    .post('product/addproduk',{
        id_user:produk.id_user,
        Nama_toko:produk.Nama_toko,
        Nama_Produk:produk.Nama_Produk,
        image: produk.Nama_Produk,
        Deskripsi:produk.Deskripsi,
        Price:produk.Price,
        Jumlah_stock:produk.Jumlah_stock
    },
    {
        headers: { 'Content-Type': 'application/json' }
    }
    )
    .then(res=>{
        console.log("produk di tambahkan")
        return res
    })
    .catch(err=>{
        console.log(err);
        return err;
    })
}
export const deleteproduk = produk =>{
    return axios
    .delete(`/product/addproduk/${produk}`,{
        headers: { 'Content-Type': 'application/json' }
    })
    .then(function(res){
        console.log(res)
    }).catch(function(err){
        console.log(err)
    })
}
export const updateproduk = (produk,id_produk) =>{
    
    return axios
    .put(`/product/addproduk/${id_produk}`,{
        id_user:produk.id_user,
        Nama_toko:produk.Nama_toko,
        Nama_Produk:produk.Nama_Produk,
        image: produk.Nama_Produk,
        Deskripsi:produk.Deskripsi,
        Price:produk.Price,
        Jumlah_stock:produk.Jumlah_stock
    }).then(function(res){
        console.log(res)
    }).catch(function(err){
        console.log(err)
    })
}
export const getProduk =()=>{
    const token = localStorage.getItem('usertoken');
    const decoded = jwt_decode(token)
    const id = decoded.id_user
    console.log("idnya adalah",id)
    return axios
    .get(`/product/?id_user=${id}`,{
        headers: { 'Content-Type': 'application/json' }
    }).then(res =>{
        return res.data
    })
    
}