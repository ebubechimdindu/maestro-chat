import type { Socket } from "socket.io";

//All users need their own dedicated WebSocket connection
//store online usrs in memory
export const onlineUsers = new Map<string,Socket>();

