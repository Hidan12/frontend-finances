import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const loginUser = createAsyncThunk("LOGIN_USER", async (user)=>{
    const userLogin = await axios.post('http://localhost:8080/api/login/signIn', user)
    return userLogin.data
   
})
const logOut = createAsyncThunk("LOGOUT_USER", async(user)=>{
    const userLogOut = await axios.post('http://localhost:8080/api/login/signOut', user.mail, {headers: {Authorization: `Bearer ${user.token}`}})
    return userLogOut.data
})

export{loginUser, logOut}