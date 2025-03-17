import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';

export default configureStore({
    reducer: {
        // On ajoute le reducer en récupérant le reducerPath et le reducer depuis apiSlice
        [apiSlice.reducerPath]: apiSlice.reducer, 
    },
    
    // On ajoute aussi le middleware
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            apiSlice.middleware,
        )
    }
})