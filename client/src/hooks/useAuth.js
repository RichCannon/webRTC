import { set } from "mongoose"
import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { userActions } from "../logic/userLogic/userReducer"

const STORAGE_NAME = `userData`

export const useAuth = () => {

   const dispatch = useDispatch()
   const [isReady, setIsReady] = useState(false)

   useEffect(() => {
      const userData = JSON.parse(localStorage.getItem(STORAGE_NAME))
      if (userData) {
         dispatch(userActions.setCurrentUser(userData))
      }
      setIsReady(true)
   }, [])

   const login = useCallback(({ jwtToken, id }) => {
      const dataToStore = {
         token: jwtToken,
         userId: id,
      }
      dispatch(userActions.setCurrentUser(dataToStore))
      localStorage.setItem(STORAGE_NAME, JSON.stringify(dataToStore))
   }, [])

   const logout = useCallback(() => {
      const dataToStore = {
         token: null,
         userId: null,
      }
      dispatch(userActions.setCurrentUser(dataToStore))
      localStorage.removeItem(STORAGE_NAME)
   }, [])

   return { login, logout, token, userId, isReady }
}