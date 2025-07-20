export default function DashboardStats({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-xl shadow p-5 border-l-4 border-blue-500">
        <p className="text-gray-500">Active Visitors</p>
        <p className="text-3xl font-bold text-blue-600">{stats.totalActive}</p>
      </div>
      <div className="bg-white rounded-xl shadow p-5 border-l-4 border-green-500">
        <p className="text-gray-500">Total Today</p>
        <p className="text-3xl font-bold text-green-600">{stats.totalToday}</p>
      </div>
      <div className="bg-white rounded-xl shadow p-5 border-l-4 border-purple-500">
        <p className="text-gray-500">Top Pages</p>
        <ul className="text-sm mt-1">
          {Object.entries(stats.pagesVisited).map(([page, count]) => (
            <li key={page} className="text-gray-700">
              {page}: {count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
