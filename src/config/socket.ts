import io from 'socket.io-client';

import { envConfig } from './env';

const socket = io(envConfig.VITE_SOCKET_URL);

export default socket;
