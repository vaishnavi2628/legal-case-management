import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";

function AddCase() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    clientName: "",
    clientEmail: "",
    lawyerName: "",
    lawyerEmail: "",
    status: "Pending",
    hearingDate: "",
    description: "",
    progress: 0,
  });

  const [document, setDocument] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Create Case
      const res = await API.post("/cases", form);

      // Step 2: Upload Document
      if (document) {
        const formData = new FormData();
        formData.append("document", document);

        await API.post(
          `/cases/upload/${res.data._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      alert("Case Added Successfully");
      navigate("/cases");

    } catch (err) {
      console.log(err);
      alert("Error adding case");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8">
            Add New Case
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow space-y-5 max-w-xl"
          >
            <input
              type="text"
              name="title"
              placeholder="Case Title"
              value={form.title}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />

            <input
              type="text"
              name="clientName"
              placeholder="Client Name"
              value={form.clientName}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />
            <input
  type="email"
  name="clientEmail"
  placeholder="Client Email"
  value={form.clientEmail}
  onChange={handleChange}
  className="w-full border p-3 rounded"
  required
/>

            <input
              type="text"
              name="lawyerName"
              placeholder="Lawyer Name"
              value={form.lawyerName}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />
            <input
  type="email"
  name="lawyerEmail"
  placeholder="Lawyer Email"
  value={form.lawyerEmail}
  onChange={handleChange}
  className="w-full border p-3 rounded"
  required
/>
            <textarea
  name="description"
  placeholder="Case Description"
  value={form.description}
  onChange={handleChange}
  className="w-full border p-3 rounded"
  rows="4"
/>

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>

            <input
              type="date"
              name="hearingDate"
              value={form.hearingDate}
              onChange={handleChange}
              className="w-full border p-3 rounded"
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

            {/* Upload Document */}

            <div>
              <label className="block mb-2 font-semibold">
                Upload Document
              </label>

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setDocument(e.target.files[0])}
                className="w-full border p-3 rounded"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
            >
              Add Case
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCase;