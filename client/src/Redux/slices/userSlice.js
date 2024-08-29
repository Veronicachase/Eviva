import {
  createSlice,
  createAsyncThunk,
  
} from "@reduxjs/toolkit";
import {
  login as apiUserLogin,
  getUser as apiGetUser,
  deleteUser as apiDeleteUser,
} from "../../apis/index";

// Mis llamadas al backend importando las apis para usarlas con createAsyncThunk
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, { isRejectedWithValue }) => {
    try {
      const response = await apiUserLogin(userData);
      return response;
    } catch (error) {
      return isRejectedWithValue(error.response.data);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "user/fechUser",
  async (userId, { isRejectedWithValue }) => {
    try {
      const response = await apiGetUser(userId);
      return response;
    } catch (error) {
      return isRejectedWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId, { isRejectedWithValue }) => {
    try {
      const response = await apiDeleteUser(userId);
      return response;
    } catch (error) {
      return isRejectedWithValue(error.response.data);
    }
  }
);

// mis slices para user

const initialState = {
  isLoggedIn: false,
  isSubscribed: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  error: null,
  status: "Idle",
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isSubscribed = false;
      localStorage.removeItem('token')
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
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        localStorage.setItem('token', action.payload.token)
        state.status = "Succeeded";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.status = "succeded";
      })
      .addCase(loginUser.rejected, (state, action) => {
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

export const { logout } = userSlice.actions;
export default userSlice.reducer;

//   export const fetchUser = createAsyncThunk('user/getUser', async (userId, thunkAPI) => {
//     try {
//         const response = await apiGetUser(userId);
//         return response.data;
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error.response.data);
//     }
// });

// export const loginUser = createAsyncThunk('user/login', async (credentials, thunkAPI) => {
//     try {
//         const response = await axios.post(`${apiUrl}/users/login`, credentials);
//         return response.data;
//     } catch (error) {
//         return thunkAPI.rejectWithValue(error.response.data);
//     }
// });

// // User slice
// const userSlice = createSlice({
//     name: 'user',
//     initialState: {
//         data: null,
//         status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
//         error: null
//     },
//     reducers: {
//         logout: (state) => {
//             state.data = null;
//             state.status = 'idle';
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchUser.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(fetchUser.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.data = action.payload;
//             })
//             .addCase(fetchUser.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             })
//             .addCase(loginUser.pending, (state) => {
//                 state.status = 'loading';
//             })
//             .addCase(loginUser.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 state.data = action.payload;
//             })
//             .addCase(loginUser.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             });
//     }
// });

// export const { logout } = userSlice.actions;
// export default userSlice.reducer;
