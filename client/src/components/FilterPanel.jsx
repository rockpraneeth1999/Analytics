import socket from "../utils/socket";

export default function FilterPanel() {
  const sendFilter = () => {
    socket.emit("request_detailed_stats", { country: "India" });
    socket.emit("track_dashboard_action", {
      type: "track_dashboard_action",
      action: "filter_applied",
      details: {
        filterType: "country",
        value: "India",
      },
    });
    alert("Requested detailed stats for India (check console)");
  };

  return (
    <div className="mt-6">
      <button
        onClick={sendFilter}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
      >
        Apply Filter: India
      </button>
    </div>
  );
}
