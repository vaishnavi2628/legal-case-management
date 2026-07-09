import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Issues() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    fetchIssues();
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await API.get("/issues");
      setIssues(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const resolveIssue = async (id) => {
    try {
      await API.put(`/issues/${id}`);
      alert("Issue Resolved");
      fetchIssues();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">

          <h1 className="text-3xl font-bold mb-8">
            Client Issues
          </h1>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">

            <table className="w-full">

              <thead className="bg-blue-600 text-white">

                <tr>
                  <th className="p-4 text-left">
                    Client
                  </th>

                  <th className="p-4 text-left">
                    Lawyer
                  </th>

                  <th className="p-4 text-left">
                    Message
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-center">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {issues.length > 0 ? (

                  issues.map((item) => (

                    <tr
                      key={item._id}
                      className="border-b hover:bg-gray-100"
                    >

                      <td className="p-4">
                        {item.clientName}
                      </td>

                      <td className="p-4">
                        {item.lawyerName}
                      </td>

                      <td className="p-4">
                        {item.message}
                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-white ${
                            item.status === "Resolved"
                              ? "bg-green-600"
                              : "bg-yellow-500"
                          }`}
                        >
                          {item.status}
                        </span>

                      </td>

                      <td className="p-4 text-center">

                        {item.status === "Pending" ? (

                          <button
                            onClick={() => resolveIssue(item._id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                          >
                            Resolve
                          </button>

                        ) : (

                          <span className="text-green-600 font-semibold">
                            ✔ Resolved
                          </span>

                        )}

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="5"
                      className="text-center p-8 text-gray-500"
                    >
                      No Issues Raised
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Issues;