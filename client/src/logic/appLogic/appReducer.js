import { ALERT_TYPE } from "./constants"
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  alertData: {
    isVisible: false,
    errorMessage: ``,
    type: ALERT_TYPE.ERROR
  }
}


const appReducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    showAlert(state, { payload }) {
      state.alertData = { message: payload.message, type: payload?.type || ALERT_TYPE.ERROR, isVisible: true }
    },
    hideAlert(state) {
      state.alertData = { ...state.alertData, isVisible: false }
    }
  },
})

export const appActions = appReducer.actions
export default appReducer.reducer