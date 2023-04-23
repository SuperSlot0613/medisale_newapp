import { configureStore } from "@reduxjs/toolkit";
import navReducer from "../feature/navSlice";
import SellerReducer from "../feature/SellerSlice";
import AsyncStorage from "@react-native-community/async-storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
};

const persistConfig1 = {
  key: "root1",
  version: 1,
  storage: AsyncStorage,
};

const SellerReducers = persistReducer(persistConfig, SellerReducer);
const navReducers = persistReducer(persistConfig1, navReducer);

export const store = configureStore({
  reducer: {
    nav: navReducers,
    seller: SellerReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
