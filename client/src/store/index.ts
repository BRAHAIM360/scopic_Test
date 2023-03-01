import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import authReducer from "./auth/authSlice";
import { itemApi } from "./itemApi";
import { userApi } from "./userApi";

const reducer = combineReducers({
  auth: authReducer,
  item: itemApi.reducer,
  user: userApi.reducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(itemApi.middleware)
      .concat(userApi.middleware),
});

export default store;
export type RootState = ReturnType<typeof reducer>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
