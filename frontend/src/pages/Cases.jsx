import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Cases() {
  const navigate = useNavigate();

  const [cases, setCases] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("All");

  useEffect(() => {
    fetchCases();
  }, [keyword, status]);

  const fetchCases = async () => {
    try {
      let url = "/cases";

      if (keyword.trim() !== "") {
        url = `/cases/search?keyword=${keyword}`;
      } else if (status !== "All") {
        url = `/cases/status/${status}`;
      }

      const res = await API.get(url);
      setCases(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCase = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this case?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/cases/${id}`);
      fetchCases();
      alert("Case Deleted Successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to delete case");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">All Cases</h1>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by title, client or lawyer..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full md:w-96 border border-gray-300 p-3 rounded-lg"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Client</th>
                  <th className="p-3 text-left">Lawyer</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-center">Document</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {cases.length > 0 ? (
                  cases.map((c) => (
                    <tr
                      key={c._id}
                      className="border-b hover:bg-gray-100"
                    >
                      <td className="p-3">{c.title}</td>

                      <td className="p-3">{c.clientName}</td>

                      <td className="p-3">{c.lawyerName}</td>

                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-white text-sm ${
                            c.status === "Pending"
                              ? "bg-yellow-500"
                              : c.status === "Closed"
                              ? "bg-green-600"
                              : "bg-blue-600"
                          }`}
                        >
                          {c.status}
                        </span>
                      </td>

                      {/* Document */}
                      <td className="p-3 text-center">
                        {c.document ? (
                          <a
                            href={`http://localhost:5001/uploads/${c.document}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline font-medium"
                          >
                            📄 View
                          </a>
                        ) : (
                          <span className="text-gray-500">
                            No Document
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-3">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() =>
                              navigate(`/edit-case/${c._id}`)
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => deleteCase(c._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center p-6 text-gray-500"
                    >
                      No Cases Found
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

export default Cases;