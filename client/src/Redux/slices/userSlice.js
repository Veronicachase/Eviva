import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import apiUserLogin from "../../apis/user/loginUser";
import apiGetUser from "../../apis/user/getUser";
import apiDeleteUser from "../../apis/user/deleteUser";
import addUser from "../../apis/user/addUser";
import apiSubscriberUser from "../../apis/user/subscribedUser";

// Mis llamadas al backend importando las apis para usarlas con createAsyncThunk

export const userRegister = createAsyncThunk(
  "user/userRegister",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await addUser(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// si el status que envia Stripe y que se recoge en la base de datos tabla payments es succeeded o si no lo es
export const subscriberUser = createAsyncThunk(
  "user/subscriberUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await apiSubscriberUser(userId);
      const status = response.status;

      if( status ==="succeeded"){
        return true
      } else {
        return false
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await apiUserLogin(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await apiGetUser(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await apiDeleteUser(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Estado inicial del slice
const initialState = {
  isLoggedIn: false,
  isSubscribed: false,
  user: null,
  error: null,
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isSubscribed = false;
      localStorage.removeItem("token");
    },
    subscribe: (state) => {
      state.isSubscribed = true;
    },
    unsubscribe: (state) => {
      state.isSubscribed = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.isSubscribed = false;
        localStorage.setItem("token", action.payload.token);
        state.status = "succeeded";
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.isSubscribed = action.payload.isSubscribed || false;
        localStorage.setItem("token", action.payload.token);
        state.status = "succeeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(subscriberUser.fulfilled, (state) => {
        state.isSubscribed = true;
        state.status = "succeeded";
      })

      .addCase(subscriberUser.rejected, (state, action) =>{
        state.status = "failed";
        state.error = action.payload;

      })

      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.status = "succeeded";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout, subscribe, unsubscribe } = userSlice.actions;
export default userSlice.reducer;
