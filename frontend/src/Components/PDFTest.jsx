// import React, { useState } from "react";

// const BACKEND_URL = "http://localhost:3000/gemini";

// export default function PDFTest() {
//   const [file, setFile] = useState(null);
//   const [response, setResponse] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile && selectedFile.type === "application/pdf") {
//       setFile(selectedFile);
//       console.log("PDF file selected:", selectedFile.name);
//     } else {
//       alert("Please select a PDF file");
//       setFile(null);
//     }
//   };

//   const testPDFUpload = async () => {
//     if (!file) {
//       alert("Please select a PDF file first");
//       return;
//     }

//     setLoading(true);
//     setResponse("");

//     try {
//       // Create FormData for file upload
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append(
//         "text",
//         "Please analyze this document and tell me what you can see in it."
//       );

//       console.log("Sending PDF to backend...");

//       const response = await fetch(BACKEND_URL, {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("Backend response:", data);

//       setResponse(data.explanation || "No explanation received");
//     } catch (error) {
//       console.error("Error:", error);
//       setResponse(`Error: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
//       <h2>PDF Processing Test</h2>

//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="file"
//           accept=".pdf"
//           onChange={handleFileChange}
//           style={{ marginBottom: "10px" }}
//         />
//         {file && (
//           <p style={{ color: "green" }}>
//             Selected: {file.name} ({(file.size / 1024).toFixed(1)} KB)
//           </p>
//         )}
//       </div>

//       <button
//         onClick={testPDFUpload}
//         disabled={!file || loading}
//         style={{
//           padding: "10px 20px",
//           backgroundColor: loading ? "#ccc" : "#007bff",
//           color: "white",
//           border: "none",
//           borderRadius: "5px",
//           cursor: loading ? "not-allowed" : "pointer",
//         }}
//       >
//         {loading ? "Processing..." : "Test PDF Upload"}
//       </button>

//       {response && (
//         <div
//           style={{
//             marginTop: "20px",
//             padding: "15px",
//             backgroundColor: "#f8f9fa",
//             borderRadius: "5px",
//           }}
//         >
//           <h3>AI Response:</h3>
//           <pre style={{ whiteSpace: "pre-wrap", fontSize: "14px" }}>
//             {response}
//           </pre>
//         </div>
//       )}

//       <div style={{ marginTop: "30px", fontSize: "12px", color: "#666" }}>
//         <h4>Debug Info:</h4>
//         <p>Backend URL: {BACKEND_URL}</p>
//         <p>File selected: {file ? "Yes" : "No"}</p>
//         <p>Check browser console for detailed logs</p>
//       </div>
//     </div>
//   );
// }
