import { Action } from "@reduxjs/toolkit";
import { call, put, select, takeLeading } from "redux-saga/effects";

import { api } from "../api/api";
import { PostLoginUserReturnT } from "../api/types";
import { appActions } from "../appLogic/appReducer";
import { userActions } from "./userReducer";
import { currentUserSelector } from "./userSelector";


function* postLoginRequest(action: Action) {
  if (userActions.loginRequest.match(action)) {
    try {
      const { pushToMainPage, ...restPayload } = action.payload
      const response: PostLoginUserReturnT = yield call(api.postLoginUser, { body: restPayload })

      yield put(userActions.loginSuccess(response))
      yield call(pushToMainPage)

    } catch (e: any) {
      yield put(userActions.loginFailure(e))
    }
  }
}
function* postRegisterRequest(action: Action) {
  if (userActions.registerRequest.match(action)) {
    try {
      const { pushToMainPage, ...restPayload } = action.payload
      const response: PostLoginUserReturnT = yield call(api.postRegisterUser, { body: restPayload })

      yield put(userActions.registerSuccess(response))
      yield put(appActions.showAlert({ message: `Your account has been created!`}))
      yield call(pushToMainPage)

    } catch (e: any) {
      yield put(userActions.registerFailure(e))
    }
  }
}

function* getMyUserDataRequest(action: Action) {
  if (userActions.getMyUserDataRequest.match(action)) {
    try {

      const { token }: { token: string } = yield select(currentUserSelector);
      const payload = { headers: { authorization: `Bearer ${token}` } }
      const response: PostLoginUserReturnT = yield call(api.getMyUserData, payload)

      yield put(userActions.getMyUserDataSuccess(response))

    } catch (e: any) {
      if (e.statusCode === 400) {
        action.payload.getMyUserDataErrorCallback()
      }
      yield put(userActions.getMyUserDataFailure(e))
    }
  }
}


export function* UserSaga() {
  yield* [
    takeLeading(userActions.loginRequest.type, postLoginRequest),
    takeLeading(userActions.registerRequest.type, postRegisterRequest),
    takeLeading(userActions.getMyUserDataRequest.type, getMyUserDataRequest),
  ];
}