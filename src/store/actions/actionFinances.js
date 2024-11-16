import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let config = {
  method: '',
  maxBodyLength: Infinity,
  url: '',
  headers: { 
    'Authorization': ''
  }
};

const setFinances = createAsyncThunk("SET_FINANCE", async (token) => {
  config.url = "http://localhost:8080/api/finance/all"
  config.method = "get"
  config.headers.Authorization = `Bearer ${token}`;
  
  try {
    const response = await axios(config);
    return response.data.finances;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Manejo específico para el estado 401
      return {status:401};
    }
    return error.response ? error.response.data : error.message
  }
});

export {setFinances}