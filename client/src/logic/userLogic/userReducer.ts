import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { USER_LOCAL_STORAGE_NAME } from '../../hooks/constants'
import { DefaultReqDataT, DefaultReqErrorT } from '../../types/common'
import { PostLoginUserBodyT, PostLoginUserReturnT } from '../api/types'

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
})



export const userActions = userReducer.actions
export default userReducer.reducer