import { useState, useEffect, createContext } from 'react'
import { io } from 'socket.io-client'

const noop = () => null

const contextData = {
   socket: noop
}

export const SocketContext = createContext(contextData)

const useSocket = (token) => {

   const [socket, setSocket] = useState()

   const options = {
      "force new connection": true,
      reconnectionAttempts: "Infinity",
      timeout: 10000,
      transports: ["websocket"],
      auth: { token }
   }

   useEffect(() => {

      const socket = io('http://localhost:3001', options)
      setSocket(socket)
   }, [])

   return socket
}


export default useSocket