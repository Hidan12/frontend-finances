import { createReducer } from "@reduxjs/toolkit"
import { setFinances } from "../actions/actionFinances.js"

const initialState = {
    finances: [],
    loading: true,
    error: ""
}
export const reducerFinances = createReducer(initialState, (builder)=>{
    builder.addCase(setFinances.pending, (state, actions)=>{
        state.loading = true
    })
    .addCase(setFinances.fulfilled, (state, actions) =>{
        state.loading = false
        state.finances = actions.payload
    })
    .addCase(setFinances.rejected, (state, actions)=>{
        state.loading = false
        state.error = actions.payload
    })
})