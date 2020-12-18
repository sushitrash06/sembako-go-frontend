import axios from 'axios';


export const register = newUser => {
    return axios
    .post('http://140.238.205.80/Users/register',{
        Nama: newUser.Nama,
        Nama_toko: newUser.Nama_toko,
        Username: newUser.Username,
        Password: newUser.Password,
        Alamat: newUser.Alamat,
        Kota: newUser.Kota,
        Foto: newUser.Foto,
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
    .post('http://140.238.205.80/Users/login', {
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

export const loginAdmin = Admin =>{
    return axios
    .post('http://140.238.205.80/admin/login', {
        Username: Admin.Username,
        Password: Admin.Password,
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