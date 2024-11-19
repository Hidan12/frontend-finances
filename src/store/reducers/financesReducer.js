import { createReducer } from "@reduxjs/toolkit"
import { clearCreateFinance, clearFinance, createFinance, deleteFinance, financeSet, searchFinance, updateFinance } from "../actions/actionFinances"

const initialState= {
    finances:[],
    deleteFin: false,
    deleteLoadin:false,
    deleteError:false,
    createFin: false,
    updateFin: false,
    updateLoadin: false,
    updateError: false,
    createLoding: false,
    createError: false,
    loading: true,
    error:"",
    searchFin:""
}

const reducerFinances = createReducer(initialState, (builder)=>{
    builder.addCase(financeSet.pending, (state, action)=>{
        state.loading = true
    })
    .addCase(financeSet.fulfilled, (state, action)=>{
        state.loading = false
        state.finances = action.payload.Finances
        state.error = ""
    })
    .addCase(financeSet.rejected, (state, action)=>{
        state.loading = false
        state.finances = []
        state.error = action.payload.error
    })
    .addCase(searchFinance, (state, action)=>{
        state.searchFin = action.payload
    })
    .addCase(clearFinance, (state, action)=>{
        state.error = ""
        state.searchFin = ""
        state.finances = []
    })
    .addCase(createFinance.pending, (state, action)=>{
        state.createLoding = true
    })
    .addCase(createFinance.fulfilled, (state, action)=>{
        state.createLoding = false
        state.userLogin = action.payload
        state.createFin = true
    })
    .addCase(createFinance.rejected, (state, action)=>{
        state.createLoding = false
        state.createError = true
    })
    .addCase(clearCreateFinance, (state, action)=>{
        state.createError = false
        state.createLoding = false
        state.createFin = false
    })
    .addCase(updateFinance.pending, (state, action)=>{
        state.updateLoadin = true
    })
    .addCase(updateFinance.fulfilled, (state, action)=>{
        state.updateLoadin = false
        state.updateFin = true
        state.updateError = false
    })
    .addCase(updateFinance.rejected, (state, action)=>{
        state.updateLoadin = false
        state.updateError = true
    })
    .addCase(deleteFinance.pending, (state, action)=>{
        console.log("entroooooooooooo pending");
        
        state.deleteLoadin = true
        state.deleteError = false
        state.deleteFin = false
    })
    .addCase(deleteFinance.fulfilled, (state, action)=>{
        console.log("entrooooooooooooooooooooo al fullfie");
        
        state.deleteLoadin = false
        state.deleteFin = true
    })
    .addCase(deleteFinance.rejected, (state, action)=>{
        console.log("entrooooooooooo al rejected", action.payload);
        
        state.deleteLoadin = false
        state.deleteError = true
    })
})


export {reducerFinances}