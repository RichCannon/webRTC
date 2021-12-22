const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
  alertData: {
    isVisible: false,
    errorMessage: ``
  }
}


const appReducer = createSlice({
  name: "app",
  initialState,
  reducers: {
    showAlert(state, action) {
      state.alertData = { message: action, isVisible: true }
    },
    hideAlert(state) {
      state.alertData = { message: ``, isVisible: false }
    }
  },
})

export const appActions = appReducer.actions
export default appReducer.reducer