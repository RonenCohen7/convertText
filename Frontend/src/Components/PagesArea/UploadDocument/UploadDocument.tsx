import { useState } from "react";
import "./UploadDocument.css";
import { useNavigate } from "react-router-dom";
import { documentServices } from "../../../services/documentServices";

export function UploadDocument() {



    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    async function send() {
        if (!file) {
            alert("Pleas Select file");
            return;
        }
        try {
            setLoading(true)

            await documentServices.uploadDocument(file!);
            alert("Document uploaded successfully");
            navigate("/documents");
        } catch (err) {
            console.log(console.error(err))
            alert("Upload failed");
        }
        finally{
            setLoading(false);
        }

    }




    return (
        <div className="UploadDocument">
           <div className="upload-card">
            <h2>Upload Document</h2>
            <input type="file" accept=".pdf,.docx" onChange={e => setFile(e.target.files?.[0]|| null)}/>
            {file && (
                <div className="file-info">
                    <strong>{file.name}</strong>
                    <span>
                        {(file.size /1024).toFixed(1)}KB
                    </span>
                </div>
            )}
            <button className="btn-upload" onClick={send} disabled={loading}>
                {loading ? "uploading...": "Upload"}
            </button>
           </div>
        </div>
    );
}
