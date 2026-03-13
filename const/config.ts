const PROTOCOL = "http";
const API_URL = "52.74.129.113";
const SOCKET_URL = "18.140.38.24";
const API_PORT = "3000";
const SOCKET_PORT = "3011";

export const config = {
  BASE_URL: `${PROTOCOL}://${API_URL}:${API_PORT}/api/wcs`,
  SOCKET_URL: `${PROTOCOL}://${SOCKET_URL}:${SOCKET_PORT}`,
};
