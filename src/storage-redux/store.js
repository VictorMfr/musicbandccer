import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import routesReducer from './routes';
import repertoryReducer from './repertory';

const store = configureStore({
    reducer: {
        auth: authReducer,
        routes: routesReducer,
        repertory: repertoryReducer,
    }
});

export default store;