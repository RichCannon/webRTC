import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api } from '../api/api'


const initialState = {
   createRoom: {
      data: {
         connected: false
      },
      fetching: false,
      error: null
   },
   checkRoom: {
      data: {},
      fetching: true,
      error: null
   },
   enterRoomPass: {
      data: {},
      fetching: false,
      error: null
   }
}

export const createRoomRequest = createAsyncThunk(
   'room/createRoomRequest',
   async (roomData, { getState, rejectWithValue }) => {
      try {
         const token = getState().user.currentUser.token
         const response = await api.postCreateRoom({
            body: roomData,
            headers: { authorization: `Bearer ${token}` }
         })
         return response
      } catch (e) {
         return rejectWithValue(e)
      }
   }
)

export const checkRoomRequest = createAsyncThunk(
   'room/checkRoomRequest',
   async ({ roomId }, { getState, rejectWithValue }) => {
      try {
         const token = getState().user.currentUser.token
      
         const response = await api.getCheckRoom({
            params: { roomId },
            headers: { authorization: `Bearer ${token}` }
         })
         return response
      } catch (e) {
         return rejectWithValue(e)
      }
   }
)

export const enterRoomPassRequest = createAsyncThunk(
   'room/enterRoomPassRequest',
   async ({ roomId, password }, { getState, rejectWithValue }) => {
      try {
         const token = getState().user.currentUser.token
         const response = await api.postEnterRoomPass({
            params: { roomId },
            body: { password },
            headers: { authorization: `Bearer ${token}` }
         })
         return response
      } catch (e) {
         return rejectWithValue(e)
      }
   }
)



const roomReducer = createSlice({
   name: "room",
   initialState,
   reducers: {

   },
   extraReducers: (builder) => {
      // Create room request
      builder.addCase(createRoomRequest.fulfilled, (state, action) => {
         state.createRoom.data = action.payload
         state.createRoom.fetching = false
      })
      builder.addCase(createRoomRequest.pending, (state) => {
         state.createRoom.error = null
         state.createRoom.fetching = true
      })
      builder.addCase(createRoomRequest.rejected, (state, action) => {
         state.createRoom.error = action.payload
         state.createRoom.fetching = false
      })
      // Check room request
      builder.addCase(checkRoomRequest.fulfilled, (state, action) => {
         state.checkRoom.data = action.payload
         state.checkRoom.fetching = false
      })
      builder.addCase(checkRoomRequest.pending, (state) => {
         state.checkRoom.error = null
         state.checkRoom.fetching = true
      })
      builder.addCase(checkRoomRequest.rejected, (state, action) => {
         state.checkRoom.error = action.payload
         state.checkRoom.fetching = false
      })
      // Enter room password request
      builder.addCase(enterRoomPassRequest.fulfilled, (state, action) => {
         state.enterRoomPass.data = action.payload
         state.checkRoom.data = action.payload
         state.enterRoomPass.fetching = false
      })
      builder.addCase(enterRoomPassRequest.pending, (state) => {
         state.enterRoomPass.error = null
         state.enterRoomPass.fetching = true
      })
      builder.addCase(enterRoomPassRequest.rejected, (state, action) => {
         state.enterRoomPass.error = action.payload
         state.enterRoomPass.fetching = false
      })
   }
})



export const roomActions = roomReducer.actions
export default roomReducer.reducer