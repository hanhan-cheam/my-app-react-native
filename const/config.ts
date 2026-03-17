import {
  PROTOCOL,
  API_URL,
  SOCKET_API_URL,
  API_PORT,
  SOCKET_PORT,
} from '@env';

export const config = {
  BASE_URL: `${PROTOCOL}://${API_URL}:${API_PORT}/api/wcs`,
  SOCKET_URL: `${PROTOCOL}://${SOCKET_API_URL}:${SOCKET_PORT}`,
};