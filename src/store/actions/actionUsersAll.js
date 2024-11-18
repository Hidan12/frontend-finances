import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


const updateUser = createAsyncThunk("UPDATE_USER", async({nombre, email, contrasenia, direccion, telefono, id, token})=>{
    const user = {
        _id:id,
        name: nombre,
        mail: email,
        typeUser: 3,
        address: direccion,
        phone: telefono,
        password: contrasenia,
    }
    
    const createU = await axios.put("http://localhost:8080/api/users/update",user, {headers: {Authorization: `Bearer ${token}`}})
    return createU.data
})

const usersSet = createAsyncThunk("USERS_SET", async ({token, search})=>{
    if (search != "") {
        const users = await axios.get(`http://localhost:8080/api/users/all?search=${search}`, {headers: {Authorization: `Bearer ${token}`}})
        return users.data
    }
    const users = await axios.get("http://localhost:8080/api/users/all", {headers: {Authorization: `Bearer ${token}`}})
    return users.data
})
const createUser = createAsyncThunk("USER_CREATE", async ({nombre, email, contrasenia, direccion, telefono, token})=>{
    
    const user = {
        name: nombre,
        mail: email,
        typeUser: 3,
        address: direccion,
        phone: telefono,
        password: contrasenia,
        online: false
    }
    const createU = await axios.post("http://localhost:8080/api/users/create", user, {headers: {Authorization: `Bearer ${token}`}})
    return createU.data   
    
})
const deleteUser = createAsyncThunk("DELETE_USER", async({user, token})=>{
    const id = {...user._id}
    

    const createU = await axios.delete("http://localhost:8080/api/users/delete", {
        data: id,
        headers: {Authorization: `Bearer ${token}`}
    })
    return createU.data  
})
const searchUsers = createAction("SEARCH_USERS")
const clearCreate = createAction("CLEAR_CREATE")
const clearUsers = createAction("CLEAR_USERS")
export {usersSet, searchUsers, clearUsers, createUser, clearCreate, updateUser, deleteUser}