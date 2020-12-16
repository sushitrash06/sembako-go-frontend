import axios from 'axios';


export const register = newUser => {
    return axios
    .post('Users/register',{
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

export const loginAdmin = Admin =>{
    return axios
    .post('admin/login', {
        Username: Admin.Username,
        Password: Admin.Password,
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