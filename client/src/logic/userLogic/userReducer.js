import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../api/api'

export const STORAGE_NAME = `userData`

const initialState = {
   myUserData: {
      data: null,
      fetching: false,
      error: null
   },
   currentUser: {
      token: null,
      userId: null
   }
}

export const registerUserRequest = createAsyncThunk(
   'user/registerUserRequest',
   async (userData) => {
      const response = await api.postRegisterUser({ body: userData })
      return response
   }
)

export const loginUserRequest = createAsyncThunk(
   'user/loginUserRequest',
   async (userData) => {
      const response = await api.postLoginUser({ body: userData })
      return response
   }
)

export const getMyUserDataRequest = createAsyncThunk(
   'user/getMyUserDataRequest',
   async (_, { getState }) => {
      const token = getState().user.currentUser.token
      const response = await api.getMyUserData({ headers: { authorization: `Bearer ${token}` } })
      return response
   }
)


const userReducer = createSlice({
   name: "user",
   initialState,
   reducers: {
      setCurrentUser(state, action) {
         state.currentUser = action.payload
      },
      setMyUserData(state, action) {
         state.myUserData.data = action.payload
      },
   },
   extraReducers: (builder) => {
      // Register user
      builder.addCase(registerUserRequest.fulfilled, (state, action) => {
         state.myUserData.data = action.payload
         state.myUserData.fetching = false
      })
      builder.addCase(registerUserRequest.pending, (state) => {
         state.myUserData.error = null
         state.myUserData.fetching = true
      })
      builder.addCase(registerUserRequest.rejected, (state, action) => {
         state.myUserData.error = action.payload
         state.myUserData.fetching = false
      })
      // Login user
      builder.addCase(loginUserRequest.fulfilled, (state, action) => {
         state.myUserData.data = action.payload.userData
         localStorage.setItem(STORAGE_NAME, JSON.stringify({ userId: action.payload.userData._id, token: action.payload.token }))
         state.currentUser = {
            token: action.payload.token,
            userId: action.payload.userData._id
         }
         state.myUserData.fetching = false
      })
      builder.addCase(loginUserRequest.pending, (state) => {
         state.myUserData.error = null
         state.myUserData.fetching = true
      })
      builder.addCase(loginUserRequest.rejected, (state, action) => {
         state.myUserData.error = action.payload
         state.myUserData.fetching = false
      })
      // Get my user data
      builder.addCase(getMyUserDataRequest.fulfilled, (state, action) => {
         state.myUserData.data = action.payload
         state.myUserData.fetching = false
      })
      builder.addCase(getMyUserDataRequest.pending, (state) => {
         state.myUserData.error = null
         state.myUserData.fetching = true
      })
      builder.addCase(getMyUserDataRequest.rejected, (state, action) => {
         state.myUserData.error = action.payload
         state.myUserData.fetching = false
      })
   }
})



export const userActions = userReducer.actions
export default userReducer.reducer