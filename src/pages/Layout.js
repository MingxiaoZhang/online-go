import { Outlet, Link } from "react-router-dom";
import {Nav} from "react-bootstrap";

const Layout = () => {
    return (
        <>
            <Nav>
                <Nav.Item><Link to="/">Home</Link></Nav.Item>
                <Nav.Item><Link to="/go">Play</Link></Nav.Item>
                <Nav.Item><Link to="/puzzle">Puzzle</Link></Nav.Item>
                <Nav.Item><Link to="/gomoku">Gomoku</Link></Nav.Item>
            </Nav>

            <Outlet />
        </>
    )
};

export default Layout;
