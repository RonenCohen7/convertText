import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import { UploadDocument } from "../PagesArea/UploadDocument/UploadDocument";
import { AnalyzeDocument } from "../PagesArea/AnalyzeDocument/AnalyzeDocument";
import { Page404 } from "../PagesArea/Page404/Page404";
import { DocumentList } from "../PagesArea/DocumentList/DocumentList";

export function Routing() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/documents" />} />

            <Route path="/documents" element={<DocumentList />} />

            <Route path="/upload" element={<UploadDocument />} />

            <Route path="/analyze/:id" element={<AnalyzeDocument />} />

            <Route path="*" element={<Page404 />} />
        </Routes>
    );
}
