
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';


const postSlice=createSlice({
    name:'posts',
    initialState:{
         posts:[],
         currentPost:null,
         msg:'xin chào đây là thông báo đầu tiên '
    },
    reducers:{
       changeMsg:(state,action)=>{
          state.msg= action.payload
       }
    },
    extraReducers:(builder)=>{
       //thay đổi trạng thái và dữ liệu
       builder
       .addCase(fetchPosts.pending,(state,action)=>{
        //...code 
       })
       .addCase(fetchPosts.fulfilled,(state,action)=>{
           state.posts=action.payload
       })
    }
})
export const {changeMsg} =postSlice.actions
export default postSlice.reducer

export const fetchPosts=createAsyncThunk('post/fetchPosts',async ()=>{
    const res = await axios.get('api.../')
    return res.data

    /// trả  ra ba trạng thái pending , fullfilled và reject
})