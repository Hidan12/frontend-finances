import { createReducer } from "@reduxjs/toolkit";
import { createProperty, setProperties, updateProperty , deleteProperty,  searchProperties, clearProperties } from "../actions/actionProperty";

const initialState = {
    properties: [],    
    createProperty: false, 
    updateProperty: false,
    deleteProperty: false,
    createLoding: false,
    createError: "",  
    loading: true,
    error: "",
    searchPro: ""
   
}

const reducerProperty = createReducer(initialState, (builder)=>{
    builder.addCase(setProperties.pending,(state, action)=>{
        state.loading = true
    })
    .addCase(setProperties.fulfilled, (state, action)=>{
        state.loading = false
        state.properties = action.payload.properties
        state.error = ""
    })
    .addCase(setProperties.rejected, (state, action)=>{
        state.loading = false
        state.properties = []
        state.error = action.payload.error
    })
    .addCase(createProperty.pending, (state, action)=>{
        state.createLoding = true
    })
    .addCase(createProperty.fulfilled, (state, action)=>{
        state.createLoding = false
        state.createProperty = true
        state.createError = ""
    })
    .addCase(createProperty.rejected, (state, action)=>{
        state.createLoding = false
        state.createProperty = false
        state.createError = action.payload.error
    })
    .addCase(searchProperties, (state, action)=>{
        state.searchPro = action.payload
    })
    .addCase(clearProperties, (state, action)=>{
        state.error = ""
        state.searchPro = ""
        state.properties = []
    })
    .addCase(updateProperty.pending, (state, action)=>{
        state.updateProperty = true
    })
    .addCase(updateProperty.fulfilled, (state, action)=>{
        state.updateProperty = false
        state.updateError = ""
    })
    .addCase(updateProperty.rejected, (state, action)=>{
        state.updateProperty = false
        state.updateError = action.payload.error
    })
    .addCase(deleteProperty.pending, (state, action)=>{
        state.deleteProperty = true
    })
    .addCase(deleteProperty.fulfilled, (state, action)=>{
        state.deleteProperty = false
        state.deleteError = ""
    })
    .addCase(deleteProperty.rejected, (state, action)=>{
        state.deleteProperty = false
        state.deleteError = action.payload.error    
        
    })
})

export default reducerProperty
   
