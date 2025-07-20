const { registerSocketEvents } = require('./socketEvents');

let ioInstance = null;

function initSocket(io) {
    ioInstance = io;
    let totalDashboards = 0;

    io.on('connection', (socket) => {
        totalDashboards++;
        io.emit('user_connected', {
            type: 'user_connected',
            data: { totalDashboards, connectedAt: new Date().toISOString() }
        });

        registerSocketEvents(socket, io);

        socket.on('disconnect', () => {
            totalDashboards--;
            io.emit('user_disconnected', {
                type: 'user_disconnected',
                data: { totalDashboards }
            });
        });
    });
}

function getIO() {
    return ioInstance;
}

module.exports = { initSocket, getIO };
