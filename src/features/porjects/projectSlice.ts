import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../constants/apiPaths";

interface Project {
    _id: string,
    title: string,
    description: string,
    techStack: string[],
    siteUrl: string,
    img: string, // the secure url used to display the image from cloudinary.
    imgId?: string // the image id used for deleting the image from cloudinary when its no longer needed.
}

interface projectState {
    projects: Project[],
    isFetchingProjects: boolean,
    isUpdatingProject: boolean,
    isDeletingProject: boolean,
    isCreatingProject: boolean
}

const initialState: projectState = {
    projects: [],
    isFetchingProjects: true,
    isUpdatingProject: false,
    isDeletingProject: false,
    isCreatingProject: false
}

export const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProjects.pending, (state) => { state.isFetchingProjects = true })
            .addCase(getProjects.fulfilled, (state, action) => { state.isFetchingProjects = false; state.projects = action.payload })
            .addCase(getProjects.rejected, (state) => { state.isFetchingProjects = false })
            .addCase(addProject.pending, (state) => { state.isCreatingProject = true })
            .addCase(addProject.fulfilled, (state, action) => { state.isCreatingProject = false; state.projects = [...state.projects, action.payload] })
            .addCase(addProject.rejected, (state) => { state.isCreatingProject = false })
            .addCase(editProject.pending, (state) => { state.isUpdatingProject = true })
            .addCase(editProject.fulfilled, (state, action) => { state.isUpdatingProject = false; state.projects = state.projects.map(project => project._id === action.payload._id ? action.payload : project) })
            .addCase(editProject.rejected, (state) => { state.isUpdatingProject = false })
            .addCase(deleteProject.pending, (state) => { state.isDeletingProject = true })
            .addCase(deleteProject.fulfilled, (state, action) => { state.isDeletingProject = false; state.projects = state.projects.filter(project => project._id !== action.payload) })
            .addCase(deleteProject.rejected, (state) => { state.isDeletingProject = false })
    }
})

export const getProjects = createAsyncThunk(
    'project/getProjects',
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get(API_PATHS.PROJECTS.GET_PROJECTS)

            return response.data.projects
        } catch (error: any) {
            console.log('Error in getProjects in projectSlice')
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'Something went wrong please try again')
        }
    }
)

export const addProject = createAsyncThunk(
    'project/addProject',
    async (data: Project, thunkAPI) => {
        try {
            const { _id, ...newProject } = data
            const response = await axiosInstance.post(API_PATHS.PROJECTS.ADD_PROJECT, { ...newProject })

            return response.data.project
        } catch (error: any) {
            console.log('Error in addProject in projectSlice')
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'Something went wrong please try again')
        }

    }
)

export const editProject = createAsyncThunk(
    'project/editProject',
    async (data: Project, thunkAPI) => {
        try {
            const { _id, ...updateProject } = data
            const response = await axiosInstance.put(API_PATHS.PROJECTS.EDIT_PROJECT(_id), { ...updateProject })

            return response.data.updatedProject
        } catch (error: any) {
            console.log('Error in editProject in projectSlice')
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'Something went wrong please try again')
        }
    }
)

export const deleteProject = createAsyncThunk(
    'project/deleteProject',
    async (data: Project, thunkAPI) => {
        try {
            await axiosInstance.delete(API_PATHS.PROJECTS.DELETE_PROJECT(data._id))

            return data._id
        } catch (error: any) {
            console.log('Error in editProject in projectSlice')
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'Something went wrong please try again')
        }
    }
)

export default projectSlice.reducer