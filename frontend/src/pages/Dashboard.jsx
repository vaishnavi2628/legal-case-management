import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import CaseChart from "../components/CaseChart";
import API from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState({
    totalCases: 0,
    pendingCases: 0,
    closedCases: 0,
    inProgressCases: 0,
  });

  const [recentCases, setRecentCases] = useState([]);
  const [hearings, setHearings] = useState([]);



  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchHearings = async () => {
    try {
      const res = await API.get("/dashboard/hearings");
      setHearings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRecentCases = async () => {
    try {
      const res = await API.get("/dashboard/recent");
      setRecentCases(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchDashboard();
    fetchRecentCases();
    fetchHearings();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />
        <div className="p-8">

  <h1 className="text-3xl font-bold mb-8">
    Dashboard
  </h1>

  {/* Welcome Banner */}

  <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-xl p-8 mb-8 text-white">

    <div className="flex justify-between items-center">

      <div>

        <h2 className="text-4xl font-bold">
          Welcome, {JSON.parse(localStorage.getItem("user"))?.name}
        </h2>

        <p className="mt-3 text-blue-100 text-lg">
          Manage your legal cases efficiently from one place.
        </p>

        <div className="flex gap-8 mt-6">

          <div>
            <h3 className="text-3xl font-bold">
              {stats.totalCases}
            </h3>

            <p className="text-blue-100">
              Total Cases
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold">
              {stats.pendingCases}
            </h3>

            <p className="text-blue-100">
              Pending
            </p>
          </div>

        </div>

      </div>

      <div className="hidden md:flex flex-col items-center">

        <div className="text-7xl">
          ⚖️
        </div>

        <p className="mt-3 text-blue-100">
          Legal Case Management
        </p>

      </div>

    </div>

  </div>
  <p className="text-sm mt-2 text-blue-200">
Role : {JSON.parse(localStorage.getItem("user"))?.role}
</p>
  {/* Dashboard Cards */}

       

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-blue-600 text-white rounded-xl p-6 shadow-lg">
              <h2 className="text-lg">Total Cases</h2>
              <p className="text-4xl font-bold mt-2">
                {stats.totalCases}
              </p>
            </div>

            <div className="bg-yellow-500 text-white rounded-xl p-6 shadow-lg">
              <h2 className="text-lg">Pending</h2>
              <p className="text-4xl font-bold mt-2">
                {stats.pendingCases}
              </p>
            </div>

            <div className="bg-green-600 text-white rounded-xl p-6 shadow-lg">
              <h2 className="text-lg">Closed</h2>
              <p className="text-4xl font-bold mt-2">
                {stats.closedCases}
              </p>
            </div>

            <div className="bg-purple-600 text-white rounded-xl p-6 shadow-lg">
              <h2 className="text-lg">In Progress</h2>
              <p className="text-4xl font-bold mt-2">
                {stats.inProgressCases}
              </p>
            </div>

          </div>
          <div className="mt-10">
  <CaseChart stats={stats} />
</div>

          {/* Recent Cases */}
          <div className="bg-white mt-10 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-5">
              Recent Cases
            </h2>

            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-3">Title</th>
                  <th className="text-left p-3">Client</th>
                  <th className="text-left p-3">Lawyer</th>
                  <th className="text-left p-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {recentCases.length > 0 ? (
                  recentCases.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b hover:bg-gray-100"
                    >
                      <td className="p-3">{item.title}</td>
                      <td className="p-3">{item.clientName}</td>
                      <td className="p-3">{item.lawyerName}</td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-white ${
                            item.status === "Pending"
                              ? "bg-yellow-500"
                              : item.status === "Closed"
                              ? "bg-green-600"
                              : "bg-blue-600"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center p-5 text-gray-500"
                    >
                      No Recent Cases
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 mt-10">
  <h2 className="text-2xl font-bold mb-5">
    Upcoming Hearings
  </h2>

  {hearings.length > 0 ? (
    hearings.map((item) => (
      <div
        key={item._id}
        className="border-b py-3"
      >
        <p className="font-semibold">{item.title}</p>

        <p className="text-gray-600">
          {item.clientName}
        </p>

        <p className="text-blue-600">
          {new Date(item.hearingDate).toLocaleDateString()}
        </p>
      </div>
    ))
  ) : (
    <p>No Upcoming Hearings</p>
  )}
</div> 

        </div>
      </div>
    </div>
  );
}

export default Dashboard;