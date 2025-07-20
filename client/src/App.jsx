import { useEffect, useState } from "react";
import socket from "./utils/socket";
import DashboardStats from "./components/DashboardStats";
import LiveVisitors from "./components/LiveVisitors";
import ActiveSessions from "./components/ActiveSessions";
import FilterPanel from "./components/FilterPanel";
import ConnectionStatus from "./components/ConnectionStatus";
import VisitorsChart from "./components/VisitorsChart";

export default function App() {
  const [stats, setStats] = useState({
    totalActive: 0,
    totalToday: 0,
    pagesVisited: {},
  });
  const [sessions, setSessions] = useState([]);
  const [liveEvents, setLiveEvents] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState("Connecting...");
  const [totalDashboards, setTotalDashboards] = useState(0);

  useEffect(() => {
    socket.on("connect", () => setConnectionStatus("Connected"));
    socket.on("disconnect", () => setConnectionStatus("Disconnected"));
    socket.io.on("reconnect_attempt", () =>
      setConnectionStatus("Reconnecting...")
    );

    socket.on("visitor_update", (data) => {
      setStats(data.data.stats);
      setLiveEvents((prev) => [data.data.event, ...prev.slice(0, 10)]);
    });

    socket.on("session_activity", (data) => {
      setSessions((prev) => {
        const updated = prev.filter((s) => s.sessionId !== data.data.sessionId);
        return [data.data, ...updated];
      });
    });

    socket.on("user_connected", (data) =>
      setTotalDashboards(data.data.totalDashboards)
    );
    socket.on("user_disconnected", (data) =>
      setTotalDashboards(data.data.totalDashboards)
    );

    socket.on("alert", (data) => {
      // Simple visual alert
      window.alert(`${data.data.level.toUpperCase()}: ${data.data.message}`);
    });

    return () => {
      socket.off();
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0 animate-gradient bg-gradient-to-br from-blue-200 via-white to-blue-300"></div>
      <div className="relative z-10 max-w-7xl mx-auto backdrop-blur-lg bg-white/70 rounded-3xl shadow-2xl p-10 mt-8 transition-all duration-700 animate-fadein">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-4 drop-shadow-xl tracking-tight text-center">
          📊 Real-Time Visitor Analytics
        </h1>
        <div className="flex justify-center mb-8">
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400 rounded-full opacity-70"></div>
        </div>
        <div className="mb-8">
          <ConnectionStatus
            status={connectionStatus}
            dashboards={totalDashboards}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-blue-400 hover:bg-blue-50/60">
            <DashboardStats stats={stats} />
          </div>
          {/* <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-blue-400 hover:bg-blue-50/60">
            <DashboardStats stats={stats} />
          </div> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-blue-400 hover:bg-blue-50/60">
            <LiveVisitors events={liveEvents} />
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-blue-400 hover:bg-blue-50/60">
            <ActiveSessions sessions={sessions} />
          </div>
        </div>
        <div className="mt-10">
          <FilterPanel />
        </div>
        <div className="mt-10 bg-white rounded-2xl shadow-xl p-8 border border-blue-100 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-blue-400 hover:bg-blue-50/60">
          <VisitorsChart stats={stats} />
        </div>
      </div>
    </div>
  );
}
