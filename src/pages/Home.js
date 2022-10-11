import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/gomoku">Local</Link>
                    </li>
                    <li>
                        <Link to="/gomoku">Online</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
        ;
};

export default Home;
