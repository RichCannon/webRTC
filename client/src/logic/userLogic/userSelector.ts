import { RootState } from "../../App"

export const currentUserSelector = (state: RootState) => state.user.currentUser
export const myUserDataSelector = (state: RootState) => state.user.myUserData