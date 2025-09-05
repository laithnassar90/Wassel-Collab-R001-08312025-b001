// src/store/configureStore.js
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import rootReducer from '../reducers';
import { APIRoot } from '../constants/constants';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage

// Configure redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['session'], // only persist session slice
};

// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create axios client
const client = axios.create({
  baseURL: APIRoot,
  headers: {
    Accept: 'application/vnd.blabla-clone-v1+json',
    'Content-Type': 'application/json',
  },
  responseType: 'json',
  returnRejectedPromiseOnError: true,
});

// Add axios request interceptor for auth headers
client.interceptors.request.use((config) => {
  // Use a function to get state dynamically
  if (store) {
    const state = store.getState();
    const { email, access_token } = state.session || {};
    if (email && access_token) {
      config.headers = {
        ...config.headers,
        'X-User-Email': email,
        'X-User-Token': access_token,
      };
    }
  }
  return config;
});

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed for redux-persist
    }).concat(thunk, axiosMiddleware(client)),
  devTools: process.env.NODE_ENV !== 'production', // enable Redux DevTools only in dev
});

// Configure persistor
export const persistor = persistStore(store);

export default store;
