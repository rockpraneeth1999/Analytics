export default function ActiveSessions({ sessions }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 h-80 overflow-y-auto">
      <h2 className="text-lg font-bold mb-3 border-b pb-2 text-gray-700">
        👥 Active Sessions
      </h2>
      {sessions.length === 0 ? (
        <p className="text-gray-500 text-sm">No active sessions yet.</p>
      ) : (
        sessions.map((s) => (
          <div key={s.sessionId} className="border-b py-2 text-sm">
            <p className="font-semibold text-green-600">{s.sessionId}</p>
            <p className="text-gray-700">Current Page: {s.currentPage}</p>
            <p className="text-gray-500">Journey: {s.journey.join(" → ")}</p>
            <p className="text-gray-400 text-xs">Duration: {s.duration}s</p>
          </div>
        ))
      )}
    </div>
  );
}
