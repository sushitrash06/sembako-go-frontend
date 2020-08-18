import axios from 'axios';

export const register = newUser => {
    return axios
    .post('Users/register',{
        Nama: newUser.Nama,
        Nama_toko: newUser.Nama_toko,
        Email: newUser.Email,
        Password: newUser.Password
    })
    .then(res => {
        console.log("Registed")
    })
}

export const login_penjual = user =>{
    return axios
    .post('users/login_penjual', {
        Email: user.Email,
        Password: user.Password
    })
    .then(res =>{
        localStorage.setItem('usertoken',res.data)
        return res.data
    })
    .catch(err =>{
        console.log(err)
    })
}