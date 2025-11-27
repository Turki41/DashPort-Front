import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../features/auth/authSlice'
import heroSlice from '../features/hero/heroSlice'
import techSlice from '../features/technologies/techSlice'
import projectSlice from '../features/porjects/projectSlice'
import certificateSlice from '../features/certificates/certificateSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    hero: heroSlice,
    tech: techSlice,
    project: projectSlice,
    certificate: certificateSlice
  },
})

// Infer RootState & AppDispatch types
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
