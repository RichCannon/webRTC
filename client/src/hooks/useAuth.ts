// import { useCallback, useEffect, useState } from "react"
// import { useDispatch } from "react-redux"

// import { userActions } from "../logic/userLogic/userReducer"
// import { USER_LOCAL_STORAGE_NAME } from "./constants"


// export const useAuth = () => {

//    const dispatch = useDispatch()
//    const [isReady, setIsReady] = useState(false)

//    useEffect(() => {
//       const userData = JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_NAME))
//       if (userData) {
//          dispatch(userActions.setCurrentUser(userData))
//       }
//       setIsReady(true)
//    }, [])

//    const login = useCallback(({ jwtToken, id }) => {
//       const dataToStore = {
//          token: jwtToken,
//          userId: id,
//       }
//       dispatch(userActions.setCurrentUser(dataToStore))
//       localStorage.setItem(USER_LOCAL_STORAGE_NAME, JSON.stringify(dataToStore))
//    }, [])

//    const logout = useCallback(() => {
//       const dataToStore = {
//          token: null,
//          userId: null,
//       }
//       dispatch(userActions.setCurrentUser(dataToStore))
//       localStorage.removeItem(USER_LOCAL_STORAGE_NAME)
//    }, [])

//    return { login, logout, token, userId, isReady }
// }