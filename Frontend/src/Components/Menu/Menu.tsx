import { NavLink } from "react-router-dom";
import "./Menu.css";
export function Menu() {
    return (
        <div className="Menu">
            <div className="tooltip">
                <NavLink to="/documents" title="Document">📄</NavLink>
                <span className="tooltip-text">Document</span>
            </div>
            <div className="tooltip">
                <NavLink to="/upload" title="Upload file">🗳️</NavLink>
                <span className="tooltip-text">Upload File</span>

            </div>
            <div className="tooltip">
                <NavLink to="/compare">💻</NavLink>
                <span className="tooltip-text">Compare Document</span>

            </div>


        </div>
    );
}
