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
                            <p>{doc.fileType.toUpperCase}</p>
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

                            </div>
                        </div>
                        <div className="fack-document">
                            <pre>
                                {selectedDocument?.extractedText}
                            </pre>
                        </div>
                        <button className="btn-analyze"
                            onClick={() => navigate(`/analyze/${selectedDocument._id}`)}
                        >
                            Analyze
                        </button>
                    </>

                )}
            </section>
        </div>
    );
}
