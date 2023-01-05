import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { USER_LOCAL_STORAGE_NAME } from '../../hooks/constants'
import { DefaultReqDataT, DefaultReqErrorT } from '../../types/common'
import { api } from '../api/api'
import { PostLoginUserBodyT, PostLoginUserReturnT, PostRegisterUserBodyT } from '../api/types'

type PostLoginPayload = PostLoginUserBodyT & { pushToMainPage: () => void }
type PostLoginSuccess = PostLoginUserReturnT
type PostLoginError = DefaultReqErrorT

type GetMyUserDataPayloadT = { getMyUserDataErrorCallback: () => void }

type InitState = {
   myUserData: DefaultReqDataT<{ userName: string } | null>,
   currentUser: {
      token: string | null,
   }
}

const initialState: InitState = {
   myUserData: {
      data: null,
      fetching: false,
      error: null
   },
   currentUser: {
      token: null,
   }
}

// export const registerUserRequest = createAsyncThunk(
//    'user/registerUserRequest',
//    async (userData, { rejectWithValue }) => {
//       try {
//          return await api.postRegisterUser({ body: userData })
//       } catch (e) {
//          return rejectWithValue(e)
//       }
//    }
// )

// export const loginUserRequest = createAsyncThunk(
//    'user/loginUserRequest',
//    async (userData, { rejectWithValue }) => {
//       try {
//          return await api.postLoginUser({ body: userData })
//       } catch (e) {
//          return rejectWithValue(e)
//       }
//    }
// )

export const getMyUserDataRequest = createAsyncThunk(
   'user/getMyUserDataRequest',
   async (_, { getState, rejectWithValue }) => {
      try {
         const token = getState().user.currentUser.token
         return await api.getMyUserData({ headers: { authorization: `Bearer ${token}` } })
      } catch (e) {
         return rejectWithValue(e)
      }

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
      // Login user
      loginRequest(state, action: PayloadAction<PostLoginPayload>) {
         state.myUserData.fetching = true
         state.myUserData.error = null
      },
      loginSuccess(state, action: PayloadAction<PostLoginSuccess>) {
         state.myUserData.data = { userName: action.payload.userName }
         localStorage.setItem(USER_LOCAL_STORAGE_NAME, JSON.stringify({ token: action.payload.token }))
         state.currentUser = {
            token: action.payload.token,
         }
         state.myUserData.fetching = false
      },
      loginFailure(state, action: PayloadAction<PostLoginError>) {
         state.myUserData.fetching = false
         state.myUserData.error = action.payload
      },
      // Register user
      registerRequest(state, action: PayloadAction<PostLoginPayload>) {
         state.myUserData.fetching = true
         state.myUserData.error = null
      },
      registerSuccess(state, action: PayloadAction<PostLoginSuccess>) {
         state.myUserData.data = { userName: action.payload.userName }
         localStorage.setItem(USER_LOCAL_STORAGE_NAME, JSON.stringify({ token: action.payload.token }))
         state.currentUser = {
            token: action.payload.token,
         }
         state.myUserData.fetching = false
      },
      registerFailure(state, action: PayloadAction<PostLoginError>) {
         state.myUserData.fetching = false
         state.myUserData.error = action.payload
      },
      // Get my user data
      getMyUserDataRequest(state, action: PayloadAction<GetMyUserDataPayloadT>) {
         state.myUserData.fetching = true
         state.myUserData.error = null
      },
      getMyUserDataSuccess(state, action: PayloadAction<PostLoginSuccess>) {
         state.myUserData.data = { userName: action.payload.userName }
         state.myUserData.fetching = false
      },
      getMyUserDataFailure(state, action: PayloadAction<PostLoginError>) {
         state.myUserData.fetching = false
         state.myUserData.error = action.payload
      },
   },
   extraReducers: (builder) => {
      // Register user
      // builder.addCase(registerUserRequest.fulfilled, (state, action) => {
      //    state.myUserData.data = action.payload
      //    state.myUserData.fetching = false
      // })
      // builder.addCase(registerUserRequest.pending, (state) => {
      //    state.myUserData.error = null
      //    state.myUserData.fetching = true
      // })
      // builder.addCase(registerUserRequest.rejected, (state, action) => {
      //    state.myUserData.error = action.payload
      //    state.myUserData.fetching = false
      // })
      // Login user
      // builder.addCase(loginUserRequest.fulfilled, (state, action) => {
      //    state.myUserData.data.userName = action.payload.userName
      //    localStorage.setItem(USER_LOCAL_STORAGE_NAME, JSON.stringify({ userId: action.payload.userData._id, token: action.payload.token }))
      //    state.currentUser = {
      //       token: action.payload.token,
      //       userId: action.payload.userData._id
      //    }
      //    state.myUserData.fetching = false
      // })
      // builder.addCase(loginUserRequest.pending, (state) => {
      //    state.myUserData.error = null
      //    state.myUserData.fetching = true
      // })
      // builder.addCase(loginUserRequest.rejected, (state, action) => {
      //    state.myUserData.error = action.payload
      //    state.myUserData.fetching = false
      // })
      // Get my user data
      // builder.addCase(getMyUserDataRequest.fulfilled, (state, action) => {
      //    state.myUserData.data = action.payload
      //    state.myUserData.fetching = false
      // })
      // builder.addCase(getMyUserDataRequest.pending, (state) => {
      //    state.myUserData.error = null
      //    state.myUserData.fetching = true
      // })
      // builder.addCase(getMyUserDataRequest.rejected, (state, action) => {
      //    state.myUserData.error = action.payload
      //    state.myUserData.fetching = false
      // })
   }
})



export const userActions = userReducer.actions
export default userReducer.reducer