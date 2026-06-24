import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { DocumentModel } from "../../../models/DocumentModel";
import { documentServices } from "../../../services/documentServices";
import "./DocumentList.css";

export function DocumentList() {

    const [documents, setDocuments] = useState<DocumentModel[]>([]);
    const [selectedDocument, setSelectedDocument] = useState<DocumentModel | null>(null)

    const navigate = useNavigate();

    useEffect(() => {
        documentServices
            .getAllDocuments()
            .then(setDocuments)
            .catch(console.error)
    }, []);


    async function deleteFile(id: string) {

        const ok = window.confirm("Are you sure you want to delete this document?")
        if(!ok) return;
        try {
            await documentServices.deleteDocument(id)
            setDocuments(prev => prev.filter(doc => doc._id !== id));
            if (selectedDocument?._id) {
                setSelectedDocument(null)
            }
        }
        catch (err: any) {
            console.error(err);
            alert("Delete failed");

        }



    }


    return (
        <div className="DocumentList">
            <section className="document-sidebar">
                <h2>Document</h2>
                {documents.map(doc => (
                    <div key={doc._id} className={selectedDocument?._id === doc._id ?
                        "document-card selected" : "document-card"
                    } onClick={() => setSelectedDocument(doc)}
                    >
                        <div className="document-icon">
                            {doc.fileType === "pdf" ? "🗒️" : "📝"}

                        </div>
                        <div className="document-info">
                            <h3>{doc.originalName}</h3>
                            <p>{doc.fileType.toUpperCase()}</p>
                            <small>
                                {new Date(doc.uploadDate).toLocaleDateString()}
                            </small>
                        </div>

                    </div>



                ))}
            </section>
            <section className="document-preview">

                {!selectedDocument && (<div className="empty-preview">
                    Select a Document
                </div>)}
                {selectedDocument && (
                    <>
                        <div className="preview-header">
                            <div>
                                <h2>{selectedDocument?.originalName}</h2>
                                <p>
                                    Type: {selectedDocument?.fileType}
                                </p>
                            </div>
                            <div className="preview-actions">
                                          <button className="btn-analyze"
                            onClick={() => navigate(`/analyze/${selectedDocument._id}`)}
                        >
                            🕵🏻‍♂️
                        </button>
                        <br></br>
                        <button
                            className="btn-delete"
                            onClick={() => deleteFile(selectedDocument._id)}
                        >
                            🗑️
                        </button>
                            </div>
                        </div>
                        <div className="fake-document">
                            <pre>
                                {selectedDocument?.extractedText}
                            </pre>
                        </div>
              


                    </>

                )}
            </section>
        </div>
    );
}
