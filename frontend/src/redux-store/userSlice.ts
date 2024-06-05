import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../models/UserModel";
import * as UsersApi from "../network/users_api"
import { SignupInterface } from "../interfaces/SignupInterface";
import { LoginInterface } from "../interfaces/LoginInterface";

interface UserState{
    user: UserModel | null,
    status: "idle" | "pending" | "succeeded" | "failed",
}
const initialUserState: UserState = {
    user: null,
    status: "idle",
}
export const fetchUser = createAsyncThunk("user/fetchUser",async()=>{
    console.log("Getting user...");
    let resObj:UserState = {user:null, status:"idle"};
    try {
        const resUser = await UsersApi.getloggedinUser();
        resObj.user = resUser;
        resObj.status = "succeeded";
        return resObj;
    } catch (error) {
        console.error(error);
        resObj.user = null;
        resObj.status = "failed";
        return resObj;
    }
});

export const signupUser = createAsyncThunk("user/addUser",async(userBody: SignupInterface)=>{
    console.log("Signing up user...");
    let resObj:UserState = {user:null, status:"idle"};
    try {
        const resUser = await UsersApi.signupUser(userBody);
        resObj.user = resUser;
        resObj.status = "succeeded";
        return resObj;
    } catch (error) {
        console.error(error);
        resObj.user = null;
        resObj.status = "failed";
        return resObj;
    }
});

export const loginUser = createAsyncThunk("user/loginUser",async(userBody: LoginInterface)=>{
    console.log("Logging in user...");
    let resObj:UserState = {user:null, status:"idle"};
    try {
        const resUser = await UsersApi.loginUser(userBody);
        resObj.user = resUser;
        resObj.status = "succeeded";
        return resObj;
    } catch (error) {
        console.error(error);
        resObj.user = null;
        resObj.status = "failed";
        return resObj;
    }
});
export const logoutUser = createAsyncThunk("user/logoutUser",async()=>{
    console.log("logging out user...");
    let resObj:UserState = {user:null, status:"idle"};
    try {
        await UsersApi.logoutUser();
        resObj.status = "succeeded";
        return resObj;
    } catch (error) {
        console.error(error);
        resObj.status = "failed";
        return resObj;
    }
});

export const updateUser = createAsyncThunk("user/updateUser",async(payload:{userData: UserModel, userId: string})=>{
    console.log("Updating user...");
    let resObj:UserState = {user:null, status:"idle"};
    try {
        const resUser = await UsersApi.updateUser(payload.userData, payload.userId);
        resObj.user = resUser;
        resObj.status = "succeeded";
        return resObj;
    } catch (error) {
        console.error(error);
        resObj.user = null;
        resObj.status = "failed";
        return resObj;
    }
});



const userSlice = createSlice({
    name: "user",
    initialState : initialUserState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(fetchUser.fulfilled, (state, action)=>{
            return action.payload;
        })
        .addCase(signupUser.fulfilled, (state, action)=>{
            return action.payload;
        })
        .addCase(loginUser.fulfilled, (state, action)=>{
            return action.payload;
        })
        .addCase(logoutUser.fulfilled, (state, action)=>{
            return action.payload;
        })
        .addCase(updateUser.fulfilled, (state, action)=>{
            return action.payload;
        })
        
    },
})

export default userSlice.reducer;