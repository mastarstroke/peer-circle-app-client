import { useEffect, useState } from "react";
import api from "../lib/axios";

const API = "http://localhost:5000/api/logs";

export default function ActivityLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await api.get(`${API}/me`, {
        withCredentials: true,
      });

      setLogs(res.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 mt-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Activity Monitoring
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Recent account activities and monitoring logs
          </p>
        </div>

        <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
          Live
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">
          Loading activities...
        </p>
      ) : logs.length === 0 ? (
        <div className="border border-dashed border-gray-300 rounded-xl p-8 text-center text-sm text-gray-500">
          No activity logs yet
        </div>
      ) : (
        <div className="space-y-3">
          {logs.map((log) => (
            <div
              key={log.id}
              className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {formatAction(log.action)}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {log.details}
                  </p>
                </div>

                <span className="text-xs text-gray-400">
                  {new Date(log.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function formatAction(action) {
  return action
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}