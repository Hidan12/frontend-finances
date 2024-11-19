import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


const updateFinance = createAsyncThunk("UPDATE_FINANCE", async({fecha, descripcion, valor, user, id, token})=>{
    const finance = {
        _id:id,
        date: fecha,
        description: descripcion,
        value: valor,
        active: valor >= 0 ? true:false,
        user: user,
    }
    
    const updateFinan = await axios.put("http://localhost:8080/api/finance/update",finance, {headers: {Authorization: `Bearer ${token}`}})
    return updateFinan.data
})

const financeSet = createAsyncThunk("FINANCE_SET", async ({token, search})=>{
    if (search != "") {
        const users = await axios.get(`http://localhost:8080/api/finance/all?search=${search}`, {headers: {Authorization: `Bearer ${token}`}})
        return users.data
    }
    const users = await axios.get("http://localhost:8080/api/finance/all", {headers: {Authorization: `Bearer ${token}`}})
    return users.data
})
const createFinance = createAsyncThunk("FINANCE_CREATE", async ({fecha, descripcion, valor, user, id, token})=>{
    
  const finance = {
    _id:id,
    date: fecha,
    description: descripcion,
    value: valor,
    active: valor >= 0 ? true:false,
    user: user,
}
    const createU = await axios.post("http://localhost:8080/api/finance/create", finance, {headers: {Authorization: `Bearer ${token}`}})
    return createU.data   
    
})
const deleteFinance = createAsyncThunk("DELETE_FINANCES", async ({finance, token})=>{
    const id = {...finance._id}
    console.log("entro al delete action");

    try {
        const delet = await axios.delete("http://localhost:8080/api/finance/delete", {
            data: id,
            headers: {Authorization: `Bearer ${token}`}
        })
        return delet.data
        
    } catch (error) {
        console.log(error, "error");
        
        return error
    }
})
const searchFinance = createAction("SEARCH_FINANCE")
const clearCreateFinance = createAction("CLEAR_CREATE_FINANCE")
const clearFinance = createAction("CLEAR_FINANCE")
export {updateFinance, financeSet, createFinance, deleteFinance, searchFinance, clearCreateFinance, clearFinance}