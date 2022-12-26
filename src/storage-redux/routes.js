import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    frontend: {
        home: '/',
        register: '/register',
        login: '/login',
        any: '*',
        repertory: '/repertory',
        info: '/info'
    },

    backend: {
        url: 'https://backend-music-band-api.vercel.app',
        urlLocal: 'http://localhost:9000'
    }
}

const routesReducer = createSlice({
    name: 'routes',
    initialState,
});

export default routesReducer.reducer;