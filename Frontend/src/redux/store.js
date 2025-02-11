import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice.js"
import otherSlice from "./otherSlice.js"
import messageSlice from "./messageSlice.js"
import socketSlice from "./socketSlice.js"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const persistConfig = {
  key: 'root',
  version: 2,
  storage,
}

const rootReducer = combineReducers({
  auth:authSlice  ,
  otheruser:otherSlice,
  messages:messageSlice,
  socket:socketSlice
})


const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})


export default store;