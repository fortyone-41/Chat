import {io} from 'socket.io-client';
import Server from './addresServer'
const socket = io(''+Server)

export default socket