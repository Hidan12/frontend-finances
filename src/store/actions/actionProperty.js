import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const setProperties = createAsyncThunk("SET_PROPERTIES", async ({token, search}) => {
    if (search != "") {
        const properties = await axios.get(`http://localhost:8080/api/property/all?search=${search}`, {headers: {Authorization: `Bearer ${token}`}})
        return properties.data
    }
    const properties = await axios.get("http://localhost:8080/api/property/all", {headers: {Authorization: `Bearer ${token}`}})

    return properties.data
})



const  createProperty = createAsyncThunk("CREATE_PROPERTY", async ({name,
type,
price,
user})=>{
    const property ={
        name: name,
        type: type, 
        price: price,
        user: user
    }
    const createP = await axios.post("http://localhost:8080/api/property/create", property, {headers: {Authorization: `Bearer ${user}`}})
    return createP.data
})

const updateProperty = createAsyncThunk("UPDATE_PROPERTY", async ({name,
type,
price,
user})=>{
    const property ={
        name: name,
        type: type, 
        price: price,
        user: user
    }
    const createP = await axios.post("http://localhost:8080/api/property/update", property, {headers: {Authorization: `Bearer ${user}`}})
    return createP.data
})

const deleteProperty = createAsyncThunk("DELETE_PROPERTY", async (_id) => {
    const deleteP = await axios.delete(`http://localhost:8080/api/property/delete/${_id}`)
    return deleteP.data
})



const searchProperties = createAction("SEARCH_PROPERTIES")
const clearProperties = createAction("CLEAR_PROPERTIES")


export {setProperties, searchProperties, clearProperties, createProperty, updateProperty, deleteProperty}
