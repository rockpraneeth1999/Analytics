const { getSummary } = require('../services/analyticsService');

function registerSocketEvents(socket, io) {
    socket.on('request_detailed_stats', (filter) => {
        const stats = getSummary();
        io.emit('detailed_stats', {
            type: 'detailed_stats',
            data: { filter, stats }
        });
    });

    socket.on('track_dashboard_action', (actionData) => {
        console.log('Dashboard Action:', actionData);
    });
}

module.exports = { registerSocketEvents };
