import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { login, addUser, getUser as apiGetUser, deleteUser  } from '../../apis/index';

const apiUrl = import.meta.env.VITE_API_URL; 

// Thunks
export const fetchUser = createAsyncThunk('user/getUser', async (userId, thunkAPI) => {
    try {
        const response = await apiGetUser(userId);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const loginUser = createAsyncThunk('user/login', async (credentials, thunkAPI) => {
    try {
        const response = await axios.post(`${apiUrl}/users/login`, credentials);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// User slice
const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null,
        status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
        error: null
    },
    reducers: {
        logout: (state) => {
            state.data = null;
            state.status = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
