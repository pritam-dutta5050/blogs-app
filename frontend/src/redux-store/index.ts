import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReducer from "./userSlice"
import BloglistReducer from "./blogListSlice"

const rootReducer = combineReducers({
    user: UserReducer,
    bloglist: BloglistReducer,
})

const store = configureStore({
    reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof rootReducer>