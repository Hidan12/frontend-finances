import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const userLocal = createAction("USER_LOCAL")
const createAndLogin = createAsyncThunk("CREATE_AND_LOGIN", async ({nombre, email, contrasenia, direccion, telefono, token})=>{
    
    const user = {
        name: nombre,
        mail: email,
        typeUser: 3,
        address: direccion,
        phone: telefono,
        password: contrasenia,
        online: true
    }
    const createU = await axios.post("http://localhost:8080/api/users/create", user, {headers: {Authorization: `Bearer ${token}`}})
    return createU.data   
    
})
const loginUser = createAsyncThunk("LOGIN_USER", async (user)=>{
    const userLogin = await axios.post('http://localhost:8080/api/login/signIn', user)
    return userLogin.data
   
})
const logOut = createAsyncThunk("LOGOUT_USER", async(user)=>{
    const userLogOut = await axios.post('http://localhost:8080/api/login/signOut', user.mail, {headers: {Authorization: `Bearer ${user.token}`}})
    return userLogOut.data
})

const clearLogin = createAction("CLEAR_LOGIN")
export{loginUser, logOut, userLocal, createAndLogin, clearLogin}