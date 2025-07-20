const express = require('express');
const http = require('http');
const cors = require('cors');
const dotenv = require('dotenv');
const { Server } = require('socket.io');

const eventRoutes = require('./routes/eventsRoute');
const analyticsRoutes = require('./routes/analyticsRoute');
const { initSocket } = require('./socket');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/events', eventRoutes);
app.use('/api/analytics', analyticsRoutes);

const server = http.createServer(app);

// Initialize WebSocket
// const io = new Server(server, {
//     cors: { origin: '*' }
// });

const io = new Server(server, {
    cors: {
        origin: '*',            // Or "http://localhost:3000" for React FE
        methods: ["GET", "POST"]
    },
    transports: ["websocket"]    // <--- Force WebSocket, no polling fallback
});
initSocket(io);


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
