export default function LiveVisitors({ events }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 h-80 overflow-y-auto">
      <h2 className="text-lg font-bold mb-3 border-b pb-2 text-gray-700">
        🟢 Live Visitor Feed
      </h2>
      {events.length === 0 ? (
        <p className="text-gray-500 text-sm">No live visitors yet.</p>
      ) : (
        events.map((e, idx) => (
          <div key={idx} className="border-b py-2">
            <p className="text-sm">
              <span className="font-semibold text-blue-600">{e.sessionId}</span>{" "}
              →<span className="ml-1 text-gray-700">{e.page}</span>
              <span className="ml-1 text-gray-500">({e.type})</span>
            </p>
          </div>
        ))
      )}
    </div>
  );
}
