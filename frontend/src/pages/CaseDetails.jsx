import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

function CaseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [caseData, setCaseData] = useState(null);

  useEffect(() => {
    fetchCase();
  }, []);

  const fetchCase = async () => {
    try {
      const res = await API.get(`/client/case/${id}`);
      setCaseData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!caseData) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-bold">Loading...</h2>
      </div>
    );
  }

 

  const raiseIssue = async () => {
    if (!message.trim()) {
      alert("Please enter your issue.");
      return;
    }
  
    try {
        await API.post("/issues", {
            caseId: caseData._id,
            clientName: caseData.clientName,
            clientEmail: caseData.clientEmail,
            lawyerName: caseData.lawyerName,
            lawyerEmail: caseData.lawyerEmail,
            message,
          });
  
      alert("Issue Raised Successfully");
      setMessage("");
    } catch (err) {
      console.log(err);
      alert("Failed to Raise Issue");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-8 max-w-4xl mx-auto">

        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          ← Back
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">

          <h1 className="text-3xl font-bold mb-6">
            {caseData.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <p className="font-semibold">Client</p>
              <p>{caseData.clientName}</p>
            </div>

            <div>
              <p className="font-semibold">Lawyer</p>
              <p>{caseData.lawyerName}</p>
            </div>

            <div>
              <p className="font-semibold">Status</p>

              <span
                className={`px-3 py-1 rounded-full text-white ${
                  caseData.status === "Pending"
                    ? "bg-yellow-500"
                    : caseData.status === "Closed"
                    ? "bg-green-600"
                    : "bg-blue-600"
                }`}
              >
                {caseData.status}
              </span>
            </div>

            <div>
              <p className="font-semibold">Hearing Date</p>

              <p>
                {caseData.hearingDate
                  ? new Date(caseData.hearingDate).toLocaleDateString()
                  : "Not Scheduled"}
              </p>
            </div>

          </div>

          <div className="mt-8">

            <h2 className="font-semibold mb-3">
              Case Progress
            </h2>

            <div className="w-full bg-gray-300 rounded-full h-5">

              <div
                className="bg-blue-600 h-5 rounded-full text-center text-white text-sm"
                style={{
                  width: `${caseData.progress || 0}%`,
                }}
              >
                {caseData.progress || 0}%
              </div>

            </div>

          </div>

          <div className="mt-8">

            <h2 className="font-semibold mb-2">
              Description
            </h2>

            <div className="bg-gray-100 p-4 rounded-lg">
              {caseData.description || "No description available."}
            </div>

          </div>

          <div className="mt-8">

<h2 className="font-semibold mb-3">
  Raise an Issue
</h2>

<textarea
  rows="4"
  placeholder="Describe your issue here..."
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  className="w-full border rounded-lg p-3"
/>

<button
  onClick={raiseIssue}
  className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
>
  Raise Issue
</button>

</div>



        </div>

      </div>
    </div>
  );
}

export default CaseDetails;