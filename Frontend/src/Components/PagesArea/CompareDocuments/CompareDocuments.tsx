import { useEffect, useState } from "react";
import type { DocumentModel } from "../../../models/DocumentModel";
import { documentServices } from "../../../services/documentServices";
import "./CompareDocuments.css";

export function CompareDocuments() {
    const [documents, setDocuments] = useState<DocumentModel[]>([]);
    const [leftDoc, setLeftDoc] = useState<DocumentModel | null>(null);
    const [rightDoc, setRightDoc] = useState<DocumentModel | null>(null);
    const [result, setResult] = useState<string[]>([]);

    useEffect(() => {
        documentServices
            .getAllDocuments()
            .then(setDocuments)
            .catch(console.error);
    }, []);

    function compareDocuments() {
        if (!leftDoc || !rightDoc) {
            alert("Must select 2 documents...");
            return;
        }

        const leftLines = leftDoc.extractedText.split("\n");
        const rightLines = rightDoc.extractedText.split("\n");

        const max = Math.max(leftLines.length, rightLines.length);
        const differences: string[] = [];

        for (let i = 0; i < max; i++) {
            if (leftLines[i] !== rightLines[i]) {
                differences.push(`Line ${i + 1}:`);
                differences.push(`A: ${leftLines[i] || ""}`);
                differences.push(`B: ${rightLines[i] || ""}`);
                differences.push("");
            }
        }

        if (differences.length === 0) {
            differences.push("No differences found. Documents are identical.");
        }

        setResult(differences);
    }

    return (
        <div className="CompareDocuments">

            <div className="compare-toolbar">

                <div className="select-box">
                    <label>First document</label>
                    <select
                        value={leftDoc?._id || ""}
                        onChange={e => {
                            setLeftDoc(documents.find(d => d._id === e.target.value) || null);
                            setResult([]);
                        }}
                    >
                        <option value="">Choose document</option>
                        {documents.map(doc => (
                            <option key={doc._id} value={doc._id}>
                                {doc.originalName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="select-box">
                    <label>Second document</label>
                    <select
                        value={rightDoc?._id || ""}
                        onChange={e => {
                            setRightDoc(documents.find(d => d._id === e.target.value) || null);
                            setResult([]);
                        }}
                    >
                        <option value="">Choose document</option>
                        {documents.map(doc => (
                            <option key={doc._id} value={doc._id}>
                                {doc.originalName}
                            </option>
                        ))}
                    </select>
                </div>

            </div>

            <div className="compare-actions">
                <button
                    className="compare-button"
                    disabled={!leftDoc || !rightDoc}
                    onClick={compareDocuments}
                >
                    Compare Documents 🔍
                </button>
            </div>

            <div className="compare-grid">
                <DocumentPanel document={leftDoc} title="Document A" />
                <DocumentPanel document={rightDoc} title="Document B" />
            </div>

            {result.length > 0 && (
                <div className="compare-results">
                    <h3>Comparison Results</h3>
                    <pre>{result.join("\n")}</pre>
                </div>
            )}

        </div>
    );
}

function DocumentPanel({ document, title }: { document: DocumentModel | null; title: string }) {
    return (
        <div className="compare-panel">

            <div className="panel-header">
                <span>{title}</span>
                <strong>{document?.originalName || "No document selected"}</strong>
            </div>

            <div className="panel-body">
                {document ? (
                    <pre>{document.extractedText}</pre>
                ) : (
                    <div className="empty-state">
                        Select a document to preview
                    </div>
                )}
            </div>

        </div>
    );
}