import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import type { DocumentAnalysisModel } from "../../../models/DocumentAnalysisModel";
import { documentServices } from "../../../services/documentServices";
import "./AnalyzeDocument.css";

export function AnalyzeDocument() {

    const { id } = useParams();

    const [analysis, setAnalysis] = useState<DocumentAnalysisModel>();

    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;

        documentServices.analyzeDocument(id)
            .then(setAnalysis)
            .catch(console.error)
    }, [id]);


    return (
        <div className="AnalyzeDocument">
            <h2>Document Analysis</h2>
            {analysis && (
                <>
                    <p>
                        <strong>File Name:</strong>{analysis.fileName}
                    </p>
                    <p>
                        <strong>Original Name:</strong>{analysis.originalName}
                    </p>

                    <p>
                        <strong>Lines:</strong>{analysis.linesCount}
                    </p>
                    <p>
                        <strong>Words:</strong>{analysis.wordsCount}
                    </p>
                    <p>
                        <strong>Characters:</strong>{analysis.charactersCount}
                    </p>
                    <div>
                        <button className="btn-back-home" onClick={() => navigate(`/documents`)}>🏠</button>
                    </div>
                </>)}
        </div>
    );
}
