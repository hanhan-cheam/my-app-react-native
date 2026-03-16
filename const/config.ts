const PROTOCOL = process.env.EXPO_PUBLIC_PROTOCOL
const API_URL = process.env.EXPO_PUBLIC_API_URL
const SOCKET_URL = process.env.EXPO_PUBLIC_SOCKET_URL 
const API_PORT = process.env.EXPO_PUBLIC_API_PORT 
const SOCKET_PORT = process.env.EXPO_PUBLIC_SOCKET_PORT 

export const config = {
  BASE_URL: `${PROTOCOL}://${API_URL}:${API_PORT}/api/wcs`,
  SOCKET_URL: `${PROTOCOL}://${SOCKET_URL}:${SOCKET_PORT}`,
};
