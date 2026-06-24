import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import { UploadDocument } from "../PagesArea/UploadDocument/UploadDocument";
import { AnalyzeDocument } from "../PagesArea/AnalyzeDocument/AnalyzeDocument";
import { Page404 } from "../PagesArea/Page404/Page404";
import { DocumentList } from "../PagesArea/DocumentList/DocumentList";
import { CompareDocuments } from "../PagesArea/CompareDocuments/CompareDocuments";
import { Home } from "../PagesArea/Home/Home";

export function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" />} />

            <Route path="/documents" element={<DocumentList />} />

            <Route path="/upload" element={<UploadDocument />} />
            <Route path="/compare" element={<CompareDocuments />} />

            <Route path="/analyze/:id" element={<AnalyzeDocument />} />

            <Route path="*" element={<Page404 />} />
        </Routes>
    );
}
