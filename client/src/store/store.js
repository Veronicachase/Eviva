import { configureStore } from '@reduxjs/toolkit';
import userReducer from ' ver'

export const store= configureStore({
reducer : {

    user:userReducer,
}

})