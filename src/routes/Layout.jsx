import { Outlet, Link } from "react-router-dom"
import { useState } from "react"

function Layout() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div>
            <nav>
                <ul>
                    <li className="logo">Post&Solve</li>
                    <button 
                        className="mobile-menu-toggle"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? '✕' : '☰'}
                    </button>
                    <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
                        <li className="home-link" key="home-button">
                            <Link 
                                style={{color: "white"}} 
                                to="/" 
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                        </li>
                        <li className="create-link" key="create-button">
                            <Link 
                                style={{color: "white"}} 
                                to="/create"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
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