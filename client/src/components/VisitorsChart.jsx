import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";

export default function VisitorsChart({ stats }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const timestamp = new Date().toLocaleTimeString().slice(0, 5);
    setChartData((prev) => {
      const updated = [
        ...prev,
        { time: timestamp, visitors: stats.totalActive },
      ];
      return updated.slice(-10); // keep last 10 points
    });
  }, [stats.totalActive]);

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h2 className="text-lg font-bold mb-3 border-b pb-2 text-gray-700">
        📈 Visitors (Last 10 Minutes)
      </h2>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="visitors"
            stroke="#3b82f6"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
