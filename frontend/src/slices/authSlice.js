import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState ={
    isLoading :false,
    currentUser: null,
    error: null,
}

export const authSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers:{
        loginSuccess: (state, action)=>{
            state.currentUser = action.payload;
            state.isLoading = false;
        },
        loginFailure:(state,action)=>{
            state.error = action.payload;
        },
        registerSuccess: (state, action)=>{
            state.currentUser = action.payload;
            state.isLoading = false;
        },
        registerFailure:(state,action)=>{
            state.error = action.payload;
        },
        logoutSuccess:(state)=>{
            state.currentUser = null;
        }
    }
})

export const {loginSuccess,loginFailure,registerSuccess,registerFailure,logoutSuccess} = authSlice.actions

export default authSlice.reducer;

export const register = (user)=>async(dispatch)=>{
    try {
        const formData = new FormData();
        formData.append('name',user.name);
        formData.append('email',user.email);
        formData.append('password',user.password)

        const config={
            headers:{
                'content-type':'multipart/form-data',// Set content type to multipart/form-data for FormData
            },
        }

        const response = await axios.post(
            'http://localhost:4000/api/users/register',
            formData,
            config
    );

        if(response){
            console.log('success')
            dispatch(registerSuccess(response.data));
        }else{
            dispatch(registerFailure())
        }

    } catch (error) {
        dispatch(registerFailure());
    }  
}
