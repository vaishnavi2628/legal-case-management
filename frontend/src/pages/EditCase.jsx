import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

function EditCase() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    clientName: "",
    lawyerName: "",
    status: "",
    hearingDate: "",
  });

  useEffect(() => {
    fetchCase();
  }, []);

  const fetchCase = async () => {
    try {
      const res = await API.get(`/cases/${id}`);
      setForm(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/cases/${id}`, form);

      alert("Case Updated Successfully");

      navigate("/cases");
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6">Edit Case</h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg max-w-xl"
          >
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Case Title"
              className="w-full border p-3 rounded mb-4"
            />

            <input
              type="text"
              name="clientName"
              value={form.clientName}
              onChange={handleChange}
              placeholder="Client Name"
              className="w-full border p-3 rounded mb-4"
            />

            <input
              type="text"
              name="lawyerName"
              value={form.lawyerName}
              onChange={handleChange}
              placeholder="Lawyer Name"
              className="w-full border p-3 rounded mb-4"
            />
            <label className="font-semibold">
Progress
</label>

<input
type="range"
name="progress"
min="0"
max="100"
value={form.progress}
onChange={handleChange}
className="w-full"
/>

<p className="text-center">
{form.progress}%
</p>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-4"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Closed</option>
            </select>
            <textarea
  name="description"
  placeholder="Case Description"
  value={form.description}
  onChange={handleChange}
  className="w-full border p-3 rounded"
  rows="4"
/>

            <input
              type="date"
              name="hearingDate"
              value={form.hearingDate?.substring(0, 10)}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-4"
            />

            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded w-full"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditCase;