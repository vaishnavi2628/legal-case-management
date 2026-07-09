import { useState } from "react";
import API from "../services/api";

function UploadDocument() {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await API.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("File Uploaded Successfully");

      setFileUrl(res.data.fileUrl);
    } catch (err) {
      console.log(err);
      alert("Upload Failed");
    }
  };

  return (
    <div className="p-10 max-w-2xl mx-auto">

      <h1 className="text-3xl font-bold mb-8">
        Upload Documents
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-8">

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-6"
        />

        <button
          onClick={handleUpload}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          Upload to Azure
        </button>

        {fileUrl && (
          <div className="mt-8">

            <h2 className="font-semibold mb-2">
              Uploaded File
            </h2>

            <a
              href={fileUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline break-all"
            >
              {fileUrl}
            </a>

          </div>
        )}

      </div>

    </div>
  );
}

export default UploadDocument;