import { io } from 'socket.io-client'

let socket = null

export const connectSocket = (connect) => {
  if (connect && !socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL)
  } else if (!connect && socket) {
    socket.disconnect()
    socket = null
  }
};

export const getSocket = () => {
  return socket
};