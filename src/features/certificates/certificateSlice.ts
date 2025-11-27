import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../constants/apiPaths";

interface Certificate {
    _id: string,
    name: string,
    sub: string,
    date?: string,
    num?: string,
}

interface CertState {
    certificates: Certificate[],
    isFetchingCerts: boolean,
    isCreatingCert: boolean,
    isUpdatingCert: boolean,
    isDeletingCert: boolean
}

const initialState: CertState = {
    certificates: [],
    isFetchingCerts: true,
    isCreatingCert: false,
    isUpdatingCert: false,
    isDeletingCert: false
}

const certificateSlice = createSlice({
    name: 'cert',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCerts.pending, (state) => { state.isFetchingCerts = true })
            .addCase(getCerts.fulfilled, (state, action) => { state.isFetchingCerts = false; state.certificates = action.payload })
            .addCase(getCerts.rejected, (state) => { state.isFetchingCerts = false })
            .addCase(addCert.pending, (state) => { state.isCreatingCert = true })
            .addCase(addCert.fulfilled, (state, action) => { state.isCreatingCert = false; state.certificates = [...state.certificates, action.payload] })
            .addCase(addCert.rejected, (state) => { state.isCreatingCert = false })
            .addCase(editCert.pending, (state) => { state.isUpdatingCert = true })
            .addCase(editCert.fulfilled, (state, action) => { state.isUpdatingCert = false; state.certificates = state.certificates.map((cert) => cert._id === action.payload._id ? action.payload : cert) })
            .addCase(editCert.rejected, (state) => { state.isUpdatingCert = false })
            .addCase(deleteCert.pending, (state) => { state.isDeletingCert = true })
            .addCase(deleteCert.fulfilled, (state, action) => { state.isDeletingCert = false; state.certificates = state.certificates.filter((cert) => cert._id !== action.payload)})
            .addCase(deleteCert.rejected, (state) => { state.isDeletingCert = false })
    }
})

export const getCerts = createAsyncThunk(
    'cert/getCerts',
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get(API_PATHS.CERTIFICATES.GET_CERTS)

            return response.data.certs
        } catch (error: any) {
            console.log('Error in getCerts in projectSlice')
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'Something went wrong please try again')
        }
    }
)

export const addCert = createAsyncThunk(
    'cert/addCert',
    async (cert: Certificate, thunkAPI) => {
        try {
            const response = await axiosInstance.post(API_PATHS.CERTIFICATES.ADD_CERTS, { ...cert })

            return response.data.certificate
        } catch (error: any) {
            console.log('Error in addCert in projectSlice')
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'Something went wrong please try again')
        }
    }
)

export const editCert = createAsyncThunk(
    'cert/editCert',
    async (cert: Certificate, thunkAPI) => {
        try {
            const response = await axiosInstance.put(API_PATHS.CERTIFICATES.EDIT_CERT(cert._id), { ...cert })

            return response.data.updatedCertificate
        } catch (error: any) {
            console.log('Error in editCert in projectSlice')
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'Something went wrong please try again')
        }
    }
)

export const deleteCert = createAsyncThunk(
    'cert/deleteCert',
    async (certId: string, thunkAPI) => {
        try {
            await axiosInstance.delete(API_PATHS.CERTIFICATES.DELETE_CERT(certId))

            return certId
        } catch (error: any) {
            console.log('Error in deleteCert in projectSlice')
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'Something went wrong please try again')
        }
    }
)

export default certificateSlice.reducer