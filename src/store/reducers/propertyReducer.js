import { createReducer } from "@reduxjs/toolkit";
import { createProperty, setProperties, updateProperty, searchProperties , deleteProperty, clearProperties, clearCreateProperty } from "../actions/actionProperty";

const initialState = {
    properties: [],    
    loading: true,
    error: false,
    searchPro: "",
    updatePro: false,
    updateLoadin: false,
    updateError: false,
    createPro: false, 
    createLoding: false,
    createError: false,  
    deleteProperty: false,
    deleteLoadin:false,
    deleteError:false
   
}

const reducerProperty = createReducer(initialState, (builder)=>{
    builder.addCase(setProperties.pending,(state, action)=>{
        state.loading = true
    })
    .addCase(setProperties.fulfilled, (state, action)=>{
        state.loading = false
        state.properties = action.payload
        state.error = false
    })
    .addCase(setProperties.rejected, (state, action)=>{
        state.loading = false
        state.properties = []
        state.error = true
    })
    .addCase(createProperty.pending, (state, action)=>{
        state.createLoding = true
    })
    .addCase(createProperty.fulfilled, (state, action)=>{
        state.createLoding = false
        state.createPro = true
        state.createError = false
    })
    .addCase(createProperty.rejected, (state, action)=>{
        state.createLoding = false
        state.createPro = false
        state.createError = true
    })
    .addCase(clearCreateProperty, (state, action)=>{
        state.createLoding = false
        state.createPro = false
        state.createError = false
    })
    .addCase(searchProperties, (state, action)=>{
        state.searchPro = action.payload
    })
    .addCase(clearProperties, (state, action)=>{
        state.error = false
        state.searchPro = ""
        state.properties = []
    })
    .addCase(updateProperty.pending, (state, action)=>{
        state.updateLoadin = true
    })
    .addCase(updateProperty.fulfilled, (state, action)=>{
        state.updatePro = true
        state.updateLoadin = false
        state.updateError = false
    })
    .addCase(updateProperty.rejected, (state, action)=>{
        state.updateLoadin = false
        state.updateError = true
    })
    .addCase(deleteProperty.pending, (state, action)=>{
        state.deleteLoadin = true
    })
    .addCase(deleteProperty.fulfilled, (state, action)=>{
        state.deleteProperty = true
        state.deleteLoadin = false
        state.deleteError = true
    })
    .addCase(deleteProperty.rejected, (state, action)=>{
        state.deleteProperty = false
        state.deleteError = true    
        
    })
})

export default reducerProperty
   
