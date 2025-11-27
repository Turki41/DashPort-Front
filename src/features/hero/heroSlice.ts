import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from "../../constants/apiPaths"

interface Hero {
    name: string,
    title: string,
    description: string,
    links: string[]
    heroId: string
}

interface HeroState {
    hero: Hero | null,
    isFetching: boolean,
    isUpdatingHero: boolean,
}

const initialState: HeroState = {
    hero: null,
    isFetching: true,
    isUpdatingHero: false
}

export const heroSlice = createSlice({
    name: 'hero',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHero.pending, (state) => { state.isFetching = true })
            .addCase(getHero.fulfilled, (state, action) => { state.isFetching = false; state.hero = action.payload })
            .addCase(getHero.rejected, (state) => { state.isFetching = false })
            .addCase(editHero.pending, (state) => { state.isUpdatingHero = true })
            .addCase(editHero.fulfilled, (state, action) => { state.isUpdatingHero = false; state.hero = action.payload })
            .addCase(editHero.rejected, (state) => { state.isUpdatingHero = false })
    }
})

export const getHero = createAsyncThunk(
    'hero/getHero',
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.get(API_PATHS.HERO.GET_HERO)

            return response.data.hero
        } catch (error: any) {
            console.log('Error in getHero heroSlice')
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'Something went wrong please try again')
        }
    }
)

export const editHero = createAsyncThunk(
    'hero/editHero',
    async (data: Hero, thunkAPI) => {
        try {
            const { heroId, ...body } = data
            const response = await axiosInstance.put(API_PATHS.HERO.EDIT_HERO(heroId), { ...body })

            return response.data.updatedHero
        } catch (error: any) {
            console.log('Error in editHero heroSlice')
            return thunkAPI.rejectWithValue(error?.response?.data?.message || 'Something went wrong please try again')
        }
    }
)

export default heroSlice.reducer


