import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
    reconnection: true,
    transports: ["websocket"],
});

export default socket;
