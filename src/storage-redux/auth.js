import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuth: false,
    userData: {},
    token: '',
    isLoading: true
}

const authReducer = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login(state, action) {
            state.isAuth = true;
            state.userData = action.payload.userData;
            state.token = action.payload.token? action.payload.token: state.token;
            state.isLoading = false;
        },
        logout(state) {
            state.isAuth = false;
            state.userData = {};
            state.token = '';
            state.isLoading = false;

            localStorage.removeItem('token');
        }
    } 
});

export const authActions = authReducer.actions;
export default authReducer.reducer;