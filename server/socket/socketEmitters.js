const { getIO } = require('./index');

function emitVisitorUpdate(event, stats) {
    getIO().emit('visitor_update', {
        type: 'visitor_update',
        data: { event, stats }
    });
}

function emitSessionActivity(session) {
    getIO().emit('session_activity', {
        type: 'session_activity',
        data: {
            sessionId: session.sessionId,
            currentPage: session.currentPage,
            journey: session.journey,
            duration: Math.floor((Date.now() - session.startTime) / 1000)
        }
    });
}

function emitAlert(level, message, details) {
    getIO().emit('alert', {
        type: 'alert',
        data: { level, message, details }
    });
}

module.exports = { emitVisitorUpdate, emitSessionActivity, emitAlert };
