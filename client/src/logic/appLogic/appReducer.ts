import { ALERT_TYPE } from "./constants"
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AlertTypeT = `error` | `ok`

type InitState = {
  alertData: {
    isVisible: boolean
    message: string
    type: AlertTypeT
  }
}

type ShowAlertPayloadT = {
  message: string
  type?: AlertTypeT
}

const initialState: InitState = {
  alertData: {
    isVisible: false,
    message: ``,
    type: `error`
  }
}


const appReducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    showAlert(state, { payload }: PayloadAction<ShowAlertPayloadT>) {
      state.alertData = { message: payload.message, type: payload?.type || 'error', isVisible: true }
    },
    hideAlert(state) {
      state.alertData = { ...state.alertData, isVisible: false }
    }
  },
})

export const appActions = appReducer.actions
export default appReducer.reducer