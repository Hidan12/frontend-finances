import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const setProperties = createAsyncThunk("SET_PROPERTIES", async ({token, search}) => {
    if (search != "") {
        const properties = await axios.get(`http://localhost:8080/api/property/all?search=${search}`, {headers: {Authorization: `Bearer ${token}`}})
        
        return properties.data.allProperties
    }
    const properties = await axios.get("http://localhost:8080/api/property/all", {headers: {Authorization: `Bearer ${token}`}})
    return properties.data.allProperties
})



const  createProperty = createAsyncThunk("CREATE_PROPERTY", async ({name, type, price, user, token})=>{
    const property ={
        name: name,
        type: type, 
        price: price,
        user: user
    }
    const createP = await axios.post("http://localhost:8080/api/property/create", property, {headers: {Authorization: `Bearer ${token}`}})
    return createP.data
})

const updateProperty = createAsyncThunk("UPDATE_PROPERTY", async ({name, type, price, user, id, token})=>{
    const property ={
        _id: id,
        name: name,
        type: type, 
        price: price,
        user: user
    }
    const createP = await axios.put("http://localhost:8080/api/property/update", property, {headers: {Authorization: `Bearer ${token}`}})
    return createP.data
})

const deleteProperty = createAsyncThunk("DELETE_PROPERTY", async ({user, token}) => {
    const id = {...user._id}
    const deleteP = await axios.delete(`http://localhost:8080/api/property/delete/`,{
        data: id,
        headers: {Authorization: `Bearer ${token}`}
    })
    return deleteP.data
})



const searchProperties = createAction("SEARCH_PROPERTIES")
const clearProperties = createAction("CLEAR_PROPERTIES")
const clearCreateProperty = createAction("CLEAR_CREATE_PROPERTY")

export {setProperties, clearCreateProperty ,searchProperties, clearProperties, createProperty, updateProperty, deleteProperty}
