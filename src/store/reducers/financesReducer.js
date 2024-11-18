import { createReducer } from "@reduxjs/toolkit"
import { clearCreateFinance, clearFinance, createFinance, deleteFinances, financeSet, searchFinance, updateFinance } from "../actions/actionFinances"

const initialState= {
    finances:[],
    deleteFinances: false,
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
    .addCase(deleteFinances.pending, (state, action)=>{
        state.deleteLoadin = true
        state.deleteError = false
    })
    .addCase(deleteFinances.fulfilled, (state, action)=>{
        state.deleteLoadin = false
        state.deleteUser = true
    })
    .addCase(deleteFinances.rejected, (state, action)=>{
        state.deleteLoadin = false
        state.deleteError = true
    })
})


export {reducerFinances}