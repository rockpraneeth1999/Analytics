const { getSummary, getSessions } = require('../services/analyticsService');

exports.getSummary = (req, res) => {
    res.json(getSummary());
};

exports.getSessions = (req, res) => {
    res.json(getSessions());
};
