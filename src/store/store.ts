import rootReducer from './rootReducer';
import { configureStore } from '@reduxjs/toolkit'

const initialState = {
    users: [],
    isNeedLoadData: true,
    selectedUserId: null,
    isOpenUserInfo: false,
    userListSearchInputValue: '',
}

export const store = configureStore({
    reducer: rootReducer,
    middleware: undefined,
    devTools: undefined,
    preloadedState: initialState,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

declare let window:any; // TODO delete after finishing work
window.store = store; // TODO delete after finishing work