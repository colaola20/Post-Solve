import { Outlet, Link } from "react-router-dom"

function Layout() {
    return (
        <div>
            <nav>
                <ul>
                    <li className="logo">Post&Solve</li>
                    <div className="nav-links">
                        <li className="home-link" key="home-button">
                            <Link style={{color: "white"}} to="/" >
                                Home
                            </Link>
                        </li>
                        <li className="create-link" key="create-button">
                            <Link style={{color: "white"}} to="/create" >
                                Create Post
                            </Link>
                        </li>
                    </div>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}

export default Layout;