import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../constants/apiPaths";

interface Technology {
    _id: string;
    label: string,
    name: any,
    library: string,
    color?: string
}

interface TechState {
    technologies: Technology | null
    isFetchingTech: boolean,
    isUpdatingTech: boolean,
    isDeletingTech: boolean,
}

const initialState: TechState = {
    technologies: null,
    isFetchingTech: true,
    isUpdatingTech: false,
    isDeletingTech: false
}

export const techSlice = createSlice({
    name: 'tech',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTechnologies.pending, (state) => { state.isFetchingTech = true })
            .addCase(getTechnologies.fulfilled, (state, action) => { state.isFetchingTech = false; state.technologies = action.payload })
            .addCase(getTechnologies.rejected, (state) => { state.isFetchingTech = false })
            .addCase(addTechnology.pending, (state) => { state.isUpdatingTech = true })
            .addCase(addTechnology.fulfilled, (state, action) => { state.isUpdatingTech = false; state.technologies = action.payload })
            .addCase(addTechnology.rejected, (state) => { state.isUpdatingTech = false })
            .addCase(deleteTechnology.pending, (state) => { state.isDeletingTech = true })
            .addCase(deleteTechnology.fulfilled, (state) => { state.isDeletingTech = false })
            .addCase(deleteTechnology.rejected, (state) => { state.isDeletingTech = false })
            .addCase(editTechnology.pending, (state) => { state.isUpdatingTech = true })
            .addCase(editTechnology.fulfilled, (state, action) => { state.isUpdatingTech = false; state.technologies = action.payload })
            .addCase(editTechnology.rejected, (state) => { state.isUpdatingTech = false })
    }
})

export const getTechnologies = createAsyncThunk(
    'tech/getTech',
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get(API_PATHS.TECH.GET_TECH)

            return response.data.technologies
        } catch (error: any) {
            console.log('Error in getTechnologies in techSlice')
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'Something went wrong please try again')
        }
    }
)

export const addTechnology = createAsyncThunk(
    'tech/addTech',
    async (data: Technology, thunkAPI) => {
        try {
            const { _id: techId, ...tech } = data
            const response = await axiosInstance.post(API_PATHS.TECH.ADD_TECH, { ...tech })

            return response?.data?.technology
        } catch (error: any) {
            console.log('Error in addTechnology in techSlice')
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'Something went wrong please try again')
        }
    }
)

export const editTechnology = createAsyncThunk(
    'tech/editTech',
    async (data: Technology, thunkAPI) => {
        try {
            const { _id, ...update } = data
            const response = await axiosInstance.put(API_PATHS.TECH.EDIT_TECH(_id), { ...update })

            return response.data.updatedTech
        } catch (error: any) {
            console.log('Error in editTechnology in techSlice')
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'Something went wrong please try again')
        }
    }
)

export const deleteTechnology = createAsyncThunk(
    'tech/deleteTech',
    async (techId: string, thunkAPI) => {
        try {
            await axiosInstance.delete(API_PATHS.TECH.DELETE_TECH(techId))
        } catch (error: any) {
            console.log('Error in deleteTechnology in techSlice')
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'Something went wrong please try again')
        }
    }
)

export default techSlice.reducer