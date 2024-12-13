import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
  isLoginModalOpen: boolean;
  isRegisterModalOpen: boolean;
  loginError: string | null;
  registerError: string | null;
  loading: boolean;
  user: any | null;
}

const initialState: AuthState = {
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
  loginError: null,
  registerError: null,
  loading: false,
  user: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser', 
  async ({ username, password }: { username: string, password: string }, { rejectWithValue }) => {
    try {
      const user = await axios.post('https://fakestoreapi.com/auth/login', { username, password });
      return user.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    { username, password, email, phone }: { username: string; password: string; email: string; phone: string },
    { rejectWithValue }
  ) => {
    try {
      const user = await axios.post("https://fakestoreapi.com/users", { 
        email,
        username,
        password,
        name: {
          firstname: 'John',
          lastname: 'Doe'
        },
        address: {
          city: 'kilcoole',
          street: '7835 new road',
          number: 3,
          zipcode: '12926-3874',
          geolocation: {
            lat: '-37.3159',
            long: '81.1496'
          }
        },
        phone
      });
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.isLoginModalOpen = true;
    },
    closeLoginModal: (state) => {
      state.loginError = null;
      state.isLoginModalOpen = false;
    },
    openRegisterModal: (state) => {
      state.isRegisterModalOpen = true;
    },
    closeRegisterModal: (state) => {
      state.isRegisterModalOpen = false;
    },
    resetUsers: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoginModalOpen = false;
        console.log(state.user);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload as string;
      });

      builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isRegisterModalOpen = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.registerError = action.payload as string;
      });
  },
});

export const { openLoginModal, closeLoginModal, openRegisterModal, closeRegisterModal, resetUsers } = authSlice.actions;

export default authSlice.reducer;
