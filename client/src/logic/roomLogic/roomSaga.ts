import { Action } from "@reduxjs/toolkit";
import { call, put, select, takeLeading } from "redux-saga/effects";
import { api } from "../api/api";
import { GetCheckRoomReturnT, PostCreateRoomReturnT } from "../api/types";
import { appActions } from "../appLogic/appReducer";
import { currentUserSelector } from "../userLogic/userSelector";
import { roomActions } from "./roomReducer";


function* postCreateRoomRequest(action: Action) {
  if (roomActions.createRoomRequest.match(action)) {
    try {
      const { token }: { token: string } = yield select(currentUserSelector);
      const { onSuccessCreatRoomCallback, ...restPayload } = action.payload
      const payload = {
        body: restPayload,
        headers: { authorization: `Bearer ${token}` },
      }
      const response: PostCreateRoomReturnT = yield call(api.postCreateRoom, payload)

      yield put(roomActions.createRoomSuccess(response))
      yield call(onSuccessCreatRoomCallback, response.id)

    } catch (e: any) {
      yield put(roomActions.createRoomFailure(e))
    }
  }
}

function* getCheckRoomRequest(action: Action) {
  if (roomActions.checkRoomRequest.match(action)) {
    try {
      const { token }: { token: string } = yield select(currentUserSelector);

      const payload = {
        params: action.payload,
        headers: { authorization: `Bearer ${token}` },
      }
      const response: GetCheckRoomReturnT = yield call(api.getCheckRoom, payload)

      yield put(roomActions.checkRoomSuccess(response))

    } catch (e: any) {
      yield put(roomActions.checkRoomFailure(e))
    }
  }
}


function* postEnterRoomPassRequest(action: Action) {
  if (roomActions.enterRoomPassRequest.match(action)) {
    try {

      const { token }: { token: string } = yield select(currentUserSelector);
      const { roomId, password } = action.payload
      console.log("🚀 ~ file: roomSaga.ts:42 ~ function*postEnterRoomPassRequest ~ action.payload", action.payload)
      const payload = {
        params: { roomId },
        body: { password },
        headers: { authorization: `Bearer ${token}` },
      }
      const response: GetCheckRoomReturnT = yield call(api.postEnterRoomPass, payload)
      console.log("🚀 ~ file: roomSaga.ts:63 ~ function*postEnterRoomPassRequest ~ response", response)

      yield put(roomActions.enterRoomPassSuccess(response))

    } catch (e: any) {
      if (e.param === `alert`) {
        yield put(appActions.showAlert({ message: e.message }))
      }
      yield put(roomActions.enterRoomPassFailure(e))
    }
  }
}

export function* RoomSaga() {
  yield* [
    takeLeading(roomActions.createRoomRequest.type, postCreateRoomRequest),
    takeLeading(roomActions.checkRoomRequest.type, getCheckRoomRequest),
    takeLeading(roomActions.enterRoomPassRequest.type, postEnterRoomPassRequest),
  ];
}