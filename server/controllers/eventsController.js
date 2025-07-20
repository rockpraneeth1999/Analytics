const { addEvent, getSummary } = require('../services/analyticsService');
const { emitVisitorUpdate, emitSessionActivity, emitAlert } = require('../socket/socketEmitters');

exports.createEvent = (req, res) => {
    try {
        const event = req.body;
        const session = addEvent(event);

        // Emit WebSocket events
        emitVisitorUpdate(event, getSummary());
        emitSessionActivity(session);

        // Example alert: spike detection
        if (getSummary().totalActive > 5) {
            emitAlert('milestone', 'New visitor spike detected!', {
                visitorsLastMinute: getSummary().totalActive
            });
        }

        res.status(201).json({ message: 'Event received' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
