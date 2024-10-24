import { configureStore } from '@reduxjs/toolkit';
import { Api } from './Api';
import filterReducer from './FilterSlice'; 
import basketReducer from './BasketSlice'

export const store = configureStore({
  reducer: {
    [Api.reducerPath]: Api.reducer, 
    filter: filterReducer, 
    basket : basketReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(Api.middleware), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
