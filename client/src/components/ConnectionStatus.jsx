export default function ConnectionStatus({ status, dashboards }) {
  const color =
    status === "Connected"
      ? "text-green-600"
      : status === "Reconnecting..."
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <div className="flex items-center gap-6 mb-4 bg-white shadow-lg p-4 rounded-xl border border-blue-100">
      <span className={`font-semibold ${color} flex items-center gap-2`}>
        <span
          className={`inline-block w-3 h-3 rounded-full ${
            status === "Connected"
              ? "bg-green-400 animate-pulse"
              : status === "Reconnecting..."
              ? "bg-yellow-400 animate-pulse"
              : "bg-red-400"
          }`}
        ></span>
        Status: {status}
      </span>
      <span className="text-blue-700 text-sm font-medium px-3 py-1 bg-blue-50 rounded-full shadow">
        Dashboards: {dashboards}
      </span>
    </div>
  );
}
