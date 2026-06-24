
import { Menu } from "../../Menu/Menu";
import { Routing } from "../../Routing/Routing";
import "./Layout.css";

export function Layout() {
    return (
        <div className="Layout">
            <header></header>

            <aside>
                <Menu />
            </aside>

            <main>
                <Routing/>
            </main>
            <footer></footer>
        </div>
    );
}
