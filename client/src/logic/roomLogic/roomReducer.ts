import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DefaultReqDataT, DefaultReqErrorT } from '../../types/common'
import { api } from '../api/api'
import { GetCheckRoomParamsT, GetCheckRoomReturnT, PostCreateRoomBodyT, PostCreateRoomReturnT, PostEnterRoomPassBodyT, PostEnterRoomPassParamsT, PostEnterRoomPassReturnT } from '../api/types'

type PostCreateRoomPayloadT = PostCreateRoomBodyT
type PostCreateRoomSuccessT = PostCreateRoomReturnT | null
type PostCreateRoomErrorT = DefaultReqErrorT

type GetCheckRoomPayloadT = GetCheckRoomParamsT
type GetCheckRoomSuccessT = GetCheckRoomReturnT
type GetCheckRoomErrorT = DefaultReqErrorT

type PostEnterPassRoomPayloadT = PostEnterRoomPassBodyT & PostEnterRoomPassParamsT
type PostEnterPassRoomSuccessT = PostEnterRoomPassReturnT
type PostEnterPassRoomErrorT = DefaultReqErrorT

type InitState = {
   createRoom: DefaultReqDataT<PostCreateRoomSuccessT>,
   checkRoom: DefaultReqDataT<GetCheckRoomSuccessT | null>,
   enterRoomPass: DefaultReqDataT<{}>
}

const initialState: InitState = {
   createRoom: {
      data: null,
      fetching: false,
      error: null
   },
   checkRoom: {
      data: null,
      fetching: true,
      error: null
   },
   enterRoomPass: {
      data: {},
      fetching: false,
      error: null
   }
}

// export const createRoomRequest = createAsyncThunk(
//    'room/createRoomRequest',
//    async (roomData, { getState, rejectWithValue }) => {
//       try {
//          const token = getState().user.currentUser.token
//          const response = await api.postCreateRoom({
//             body: roomData,
//             headers: { authorization: `Bearer ${token}` }
//          })
//          return response
//       } catch (e) {
//          return rejectWithValue(e)
//       }
//    }
// )

// export const checkRoomRequest = createAsyncThunk(
//    'room/checkRoomRequest',
//    async ({ roomId }, { getState, rejectWithValue }) => {
//       try {
//          const token = getState().user.currentUser.token

//          const response = await api.getCheckRoom({
//             params: { roomId },
//             headers: { authorization: `Bearer ${token}` }
//          })
//          return response
//       } catch (e) {
//          return rejectWithValue(e)
//       }
//    }
// )

// export const enterRoomPassRequest = createAsyncThunk(
//    'room/enterRoomPassRequest',
//    async ({ roomId, password }, { getState, rejectWithValue }) => {
//       try {
//          const token = getState().user.currentUser.token
//          const response = await api.postEnterRoomPass({
//             params: { roomId },
//             body: { password },
//             headers: { authorization: `Bearer ${token}` }
//          })
//          return response
//       } catch (e) {
//          return rejectWithValue(e)
//       }
//    }
// )



const roomReducer = createSlice({
   name: "room",
   initialState,
   reducers: {
      // Create room request
      createRoomRequest(state, action: PayloadAction<PostCreateRoomPayloadT>) {
         state.createRoom.fetching = true
         state.createRoom.error = null
      },
      createRoomSuccess(state, action: PayloadAction<PostCreateRoomSuccessT>) {
         state.createRoom.fetching = false
         state.createRoom.data = action.payload
      },
      createRoomFailure(state, action: PayloadAction<PostCreateRoomErrorT>) {
         state.createRoom.fetching = false
         state.createRoom.error = action.payload
      },
      // Check room password
      checkRoomRequest(state, action: PayloadAction<GetCheckRoomPayloadT>) {
         state.checkRoom.fetching = true
         state.checkRoom.error = null
      },
      checkRoomSuccess(state, action: PayloadAction<GetCheckRoomSuccessT>) {
         state.checkRoom.fetching = false
         state.checkRoom.data = action.payload
      },
      checkRoomFailure(state, action: PayloadAction<GetCheckRoomErrorT>) {
         state.checkRoom.fetching = false
         state.checkRoom.error = action.payload
      }, 
      // Enter room password request
      enterRoomPassRequest(state, action: PayloadAction<PostEnterPassRoomPayloadT>) {
         state.enterRoomPass.fetching = true
         state.enterRoomPass.error = null
      },
      enterRoomPassSuccess(state, action: PayloadAction<PostEnterPassRoomSuccessT>) {
         state.enterRoomPass.fetching = false
         state.enterRoomPass.data = action.payload
      },
      enterRoomPassFailure(state, action: PayloadAction<PostEnterPassRoomErrorT>) {
         state.enterRoomPass.fetching = false
         state.enterRoomPass.error = action.payload
      },
   },
   extraReducers: (builder) => {
      // builder.addCase(createRoomRequest.fulfilled, (state, action) => {
      //    state.createRoom.data = action.payload
      //    state.createRoom.fetching = false
      // })
      // builder.addCase(createRoomRequest.pending, (state) => {
      //    state.createRoom.error = null
      //    state.createRoom.fetching = true
      // })
      // builder.addCase(createRoomRequest.rejected, (state, action) => {
      //    state.createRoom.error = action.payload
      //    state.createRoom.fetching = false
      // })
      // Check room request
      // builder.addCase(checkRoomRequest.fulfilled, (state, action) => {
      //    state.checkRoom.data = action.payload
      //    state.checkRoom.fetching = false
      // })
      // builder.addCase(checkRoomRequest.pending, (state) => {
      //    state.checkRoom.error = null
      //    state.checkRoom.fetching = true
      // })
      // builder.addCase(checkRoomRequest.rejected, (state, action) => {
      //    state.checkRoom.error = action.payload
      //    state.checkRoom.fetching = false
      // })
      // builder.addCase(enterRoomPassRequest.fulfilled, (state, action) => {
      //    state.enterRoomPass.data = action.payload
      //    state.checkRoom.data = action.payload
      //    state.enterRoomPass.fetching = false
      // })
      // builder.addCase(enterRoomPassRequest.pending, (state) => {
      //    state.enterRoomPass.error = null
      //    state.enterRoomPass.fetching = true
      // })
      // builder.addCase(enterRoomPassRequest.rejected, (state, action) => {
      //    state.enterRoomPass.error = action.payload
      //    state.enterRoomPass.fetching = false
      // })
   }
})



export const roomActions = roomReducer.actions
export default roomReducer.reducer