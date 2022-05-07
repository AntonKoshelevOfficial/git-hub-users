import rootReducer from './rootReducer';
import { configureStore } from '@reduxjs/toolkit'

const initialState = {
    users: [],
    selectedUserId: null,
    isOpenUserInfo: false,
}
export const store = configureStore({
    reducer: rootReducer,
    middleware: undefined,
    devTools: undefined,
    preloadedState: initialState,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch