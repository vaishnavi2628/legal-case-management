import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

function ClientDashboard() {
  const navigate = useNavigate();

  const [cases, setCases] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchMyCases();
  }, []);

  const fetchMyCases = async () => {
    try {
      const res = await API.get("/client/cases");
      setCases(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const activeCases = cases.filter(
    (item) => item.status !== "Closed"
  ).length;

  const closedCases = cases.filter(
    (item) => item.status === "Closed"
  ).length;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8">

        <h1 className="text-3xl font-bold mb-6">
          Client Dashboard
        </h1>

        {/* Welcome Banner */}

        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl shadow-xl p-8 mb-8 text-white">

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-4xl font-bold">
                Welcome, {user?.name}
              </h2>

              <p className="mt-3 text-green-100 text-lg">
                Track your legal cases and stay updated with every progress.
              </p>

              <p className="mt-2 text-green-200">
                Role : {user?.role}
              </p>

            </div>

            <div className="hidden md:flex flex-col items-center">

<div className="text-6xl">
  👨‍⚖️
</div>

<p className="mt-2 text-green-100">
  Client Portal
</p>

<button
  onClick={logout}
  className="mt-5 bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-semibold"
>
  Logout
</button>

</div>

          </div>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-blue-600 text-white rounded-xl p-6 shadow-lg">

            <h2 className="text-lg font-semibold">
              My Cases
            </h2>

            <p className="text-4xl font-bold mt-3">
              {cases.length}
            </p>

          </div>

          <div className="bg-yellow-500 text-white rounded-xl p-6 shadow-lg">

            <h2 className="text-lg font-semibold">
              Active Cases
            </h2>

            <p className="text-4xl font-bold mt-3">
              {activeCases}
            </p>

          </div>

          <div className="bg-green-600 text-white rounded-xl p-6 shadow-lg">

            <h2 className="text-lg font-semibold">
              Closed Cases
            </h2>

            <p className="text-4xl font-bold mt-3">
              {closedCases}
            </p>

          </div>

        </div>

        {/* Case Table */}

        <div className="bg-white rounded-xl shadow-lg mt-10 p-6">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-2xl font-bold">
              My Case History
            </h2>

          </div>

          <table className="w-full">

            <thead className="border-b">

              <tr>

                <th className="text-left p-3">
                  Title
                </th>

                <th className="text-left p-3">
                  Lawyer
                </th>

                <th className="text-left p-3">
                  Status
                </th>

                <th className="text-left p-3">
                  Progress
                </th>

                <th className="text-center p-3">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {cases.length > 0 ? (

                cases.map((item) => (

                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-100"
                  >

                    <td className="p-3">
                      {item.title}
                    </td>

                    <td className="p-3">
                      {item.lawyerName}
                    </td>

                    <td className="p-3">

                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${
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

                    <td className="p-3">

                      <div className="w-full bg-gray-200 rounded-full h-4">

                        <div
                          className="bg-blue-600 h-4 rounded-full text-center text-white text-xs"
                          style={{
                            width: `${item.progress || 0}%`,
                          }}
                        >
                          {item.progress || 0}%
                        </div>

                      </div>

                    </td>

                    <td className="text-center">

                      <button
                        onClick={() =>
                          navigate(`/case/${item._id}`)
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                      >
                        View Details
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="5"
                    className="text-center p-6 text-gray-500"
                  >
                    No Cases Available
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}

export default ClientDashboard;