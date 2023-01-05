import { RootState } from "../../App"

export const checkRoomSelector = (state: RootState) => state.room.checkRoom
export const enterRoomPassSelector = (state: RootState) => state.room.enterRoomPass
export const createRoomSelector = (state: RootState) => state.room.createRoom