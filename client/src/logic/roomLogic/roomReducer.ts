import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { DefaultReqDataT, DefaultReqErrorT } from '../../types/common'
import {
   GetCheckRoomParamsT,
   GetCheckRoomReturnT,
   PostCreateRoomBodyT,
   PostCreateRoomReturnT,
   PostEnterRoomPassBodyT,
   PostEnterRoomPassParamsT,
   PostEnterRoomPassReturnT
} from '../api/types'

type PostCreateRoomPayloadT = PostCreateRoomBodyT & { onSuccessCreatRoomCallback: (roomId: string) => void }
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

const checkRoomInitState = {
   data: null,
   fetching: true,
   error: null
}

const initialState: InitState = {
   createRoom: {
      data: null,
      fetching: false,
      error: null
   },
   checkRoom: checkRoomInitState,
   enterRoomPass: {
      data: {},
      fetching: false,
      error: null
   }
}

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
      checkRoomReset(state) {
         state.checkRoom = checkRoomInitState;
      },
      // Enter room password request
      enterRoomPassRequest(state, action: PayloadAction<PostEnterPassRoomPayloadT>) {
         state.enterRoomPass.fetching = true
         state.enterRoomPass.error = null
      },
      enterRoomPassSuccess(state, action: PayloadAction<PostEnterPassRoomSuccessT>) {
         state.enterRoomPass.fetching = false
         state.checkRoom.data = action.payload
      },
      enterRoomPassFailure(state, action: PayloadAction<PostEnterPassRoomErrorT>) {
         state.enterRoomPass.fetching = false
         state.enterRoomPass.error = action.payload
      },
   },  
})



export const roomActions = roomReducer.actions
export default roomReducer.reducer