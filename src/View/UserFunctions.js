import axios from 'axios';

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
        //console.log(req.body)
    })
    .catch(err => {
        console.log(err);
        return err;
    })
}

export const login = user =>{
    return axios
    .post('users/login', {
        Email: user.Email,
        Password: user.Password
    })
    .then(res =>{
        
        localStorage.setItem('usertoken',res.data)
        return res.data
        
    })
    .catch(err =>{
        console.log(err,"user function")
    })
}