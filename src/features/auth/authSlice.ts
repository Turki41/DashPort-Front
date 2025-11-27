import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../constants/apiPaths";

interface User {
    name?: string
    email: string,
    password: string,
    role?: string
}
interface Data extends User {
    key: string
}

interface AuthState {
    user: User | null,
    loading: boolean,
    isCheckingAuth: boolean
}

const initialState: AuthState = {
    user: null,
    loading: false,
    isCheckingAuth: true
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => { state.loading = true })
            .addCase(login.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; state.isCheckingAuth = false })
            .addCase(login.rejected, (state) => { state.loading = false; state.isCheckingAuth = false })
            .addCase(signup.pending, (state) => { state.loading = true })
            .addCase(signup.fulfilled, (state, action) => { state.loading = false; state.user = action.payload })
            .addCase(signup.rejected, (state) => { state.loading = false })
            .addCase(checkAuth.pending, (state) => { state.loading = true; state.isCheckingAuth = true })
            .addCase(checkAuth.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; state.isCheckingAuth = false })
            .addCase(checkAuth.rejected, (state) => { state.loading = false; state.isCheckingAuth = false })
            .addCase(logout.pending, (state) => { state.loading = true })
            .addCase(logout.fulfilled, (state, action) => { state.loading = false; state.user = action.payload })
            .addCase(logout.rejected, (state) => { state.loading = false })
    }
})

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: User, thunkAPI) => {
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password })

            return response.data.user
        } catch (error: any) {
            console.log('Error in login authSlice')
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'Something went wrong please try again')
        }
    }
)

export const signup = createAsyncThunk(
    'auth/signup',
    async (data: Data, thunkAPI) => {
        try {
            const response = axiosInstance.post(API_PATHS.AUTH.SIGNUP, { ...data })

            return (await response).data.user
        } catch (error: any) {
            console.log('Error in signup authSlice')
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'Something went wrong please try again')
        }
    }
)

export const checkAuth = createAsyncThunk(
    'auth/check-auth',
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get(API_PATHS.AUTH.CHECK_AUTH)

            return response.data.user
        } catch (error: any) {
            console.log('Error in checkAuth authSlice')
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'Something went wrong please try again')
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            await axiosInstance.post(API_PATHS.AUTH.LOGOUT)

            return null
        } catch (error: any) {
            console.log('Error in logout authSlice')
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'Something went wrong please try again')
        }
    }
)

export default authSlice.reducer