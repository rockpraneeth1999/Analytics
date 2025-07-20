let activeSessions = {};
let pageVisitCount = {};
let totalVisitorsToday = 0;
let todayDate = new Date().toISOString().split('T')[0];

function resetIfNewDay() {
    const currentDate = new Date().toISOString().split('T')[0];
    if (todayDate !== currentDate) {
        todayDate = currentDate;
        totalVisitorsToday = 0;
        pageVisitCount = {};
    }
}

function addEvent(event) {
    resetIfNewDay();
    const { type, page, sessionId, timestamp } = event;

    let session = activeSessions[sessionId];
    if (type === 'session_end') {
        delete activeSessions[sessionId];
        return session;
    }

    if (!activeSessions[sessionId]) {
        activeSessions[sessionId] = {
            sessionId,
            journey: [],
            currentPage: null,
            startTime: new Date(timestamp).getTime()
        };
        totalVisitorsToday++;
    }

    if (type === 'pageview' || type === 'click') {
        activeSessions[sessionId].currentPage = page;
        activeSessions[sessionId].journey.push(page);
        pageVisitCount[page] = (pageVisitCount[page] || 0) + 1;
    }


    return activeSessions[sessionId];
}

function getSummary() {
    resetIfNewDay();
    return {
        totalActive: Object.keys(activeSessions).length,
        totalToday: totalVisitorsToday,
        pagesVisited: pageVisitCount
    };
}

function getSessions() {
    return Object.values(activeSessions).map(session => ({
        sessionId: session.sessionId,
        currentPage: session.currentPage,
        journey: session.journey,
        duration: Math.floor((Date.now() - session.startTime) / 1000)
    }));
}

module.exports = { addEvent, getSummary, getSessions };
