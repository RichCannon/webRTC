import { useState, useEffect, createContext } from 'react'
import { io, Socket } from 'socket.io-client'

type SocketContextT = {
   socket: null | Socket
}

const noop = () => null 

const contextData = {
   socket: null
}

export const SocketContext = createContext<SocketContextT>(contextData)

const useSocket = (token: string) => {

   const [socket, setSocket] = useState<Socket | null>(null)

   useEffect(() => {

      const socket = io('http://localhost:3001', {
         forceNew: true,
         timeout: 10000,
         transports: ["websocket"],
         auth: { token }
      })
      setSocket(socket)
   }, [])

   return socket
}


export default useSocket