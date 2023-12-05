import axios from 'axios'
import { createAsyncThunk} from '@reduxjs/toolkit'

interface AuthInterface {
  login: string,
  password: string,
}

export const registerUser = createAsyncThunk(
    'auth/register', 
  async (credentials: AuthInterface, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      await axios.post(
        `/api/register`,
        credentials,
        config
      )
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        return;
      }

    // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async(credentials: AuthInterface, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const {data} = await axios.post(
        `/api/login`,
        credentials,
        config
      )
  
      localStorage.setItem('userToken', data.userToken)
      return data
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        return;
      }

      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }

   
  }

)