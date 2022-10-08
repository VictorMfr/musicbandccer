import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    frontend: {
        home: '/',
        register: '/register',
        login: '/login',
        any: '*',
        repertory: '/repertory'
    },

    backend: {
        url: 'http://localhost:9000'
    }
}

const routesReducer = createSlice({
    name: 'routes',
    initialState,
});

export default routesReducer.reducer;