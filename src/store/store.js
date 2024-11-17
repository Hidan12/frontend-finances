import { configureStore } from "@reduxjs/toolkit";
import { reducerFinances } from "./reducers/financesReducer.js";
import { reducerUser } from "./reducers/loginReducer.js";
import { usersReducer } from "./reducers/usersReducer.js";
import reducerProperty from "./reducers/propertyReducer.js";


const store = configureStore({
    reducer:{
        financeReducer: reducerFinances,
        loginReducer: reducerUser,
        usersReducer: usersReducer,
        PropertyReducer: reducerProperty
    }
})
export {store}