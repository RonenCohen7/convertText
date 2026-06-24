import { NavLink } from "react-router-dom";
import "./Home.css";

export function Home() {
    return (
        <div className="Home">

            <div className="hero">
                <h1>Document Intelligence Platform</h1>
                <p>
                    Upload, analyze and compare documents using AI.
                </p>
            </div>

            <div className="home-grid">

                <NavLink to="/documents" className="home-card">
                    <span>📄</span>
                    <h2>Documents</h2>
                    <p>Browse all uploaded documents</p>
                </NavLink>

                <NavLink to="/upload" className="home-card">
                    <span>📤</span>
                    <h2>Upload</h2>
                    <p>Upload PDF and Word documents</p>
                </NavLink>

                <NavLink to="/compare" className="home-card">
                    <span>⚖️</span>
                    <h2>Compare</h2>
                    <p>Compare two documents side by side</p>
                </NavLink>

            </div>

        </div>
    );
}