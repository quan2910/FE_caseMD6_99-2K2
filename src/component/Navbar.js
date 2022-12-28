import {Link, Outlet} from "react-router-dom";

export default function Navbar() {
    return (
        <>
            {/* ======= Header ======= */}
            <header id="header" className="header-top" style={{background: "linear-gradient(to right, #FF4B2B, #FF416C)"}}>
                <div className="containerTemplate">
                    <h1> <Link style={{marginRight: 20}} to={'/home'} className="nav-link">Wallet </Link></h1>
                    {/* Uncomment below if you prefer to use an image logo */}
                    {/* <a href="index.html" class="mr-auto"><img src="assets/img/logo.png" alt="" class="img-fluid"></a> */}
                    <h2>I'm a passionate <span>graphic designer</span> from New York</h2>
                    <nav id="navbar" className="navbar">
                        <ul>
                            <Link style={{marginRight: 20}} to={'/home'} className="nav-link">Home</Link>
                            <Link style={{marginRight: 20}} to={'create-wallet'} className="nav-link">Create Wallet</Link>
                            <li><a className="nav-link" href="#about">About</a></li>
                            <li><a className="nav-link" href="#resume">Resume</a></li>
                            <li><a className="nav-link" href="#services">Services</a></li>
                            <li><a className="nav-link" href="#portfolio">Portfolio</a></li>
                            <li><a className="nav-link" href="#contact">Contact</a></li>
                            <li>
                                <div style={{marginLeft : '620px'}}>
                                    <Link className="nav-link" style={{marginRight: "10px"}} to={"/"}>LogOut</Link>
                                </div>
                            </li>
                        </ul>

                        <i className="bi bi-list mobile-nav-toggle" />
                    </nav>{/* .navbar */}
                    <div className="social-links">
                        <a href="#" className="twitter"><i className="bi bi-twitter" /></a>
                        <a href="#" className="facebook"><i className="bi bi-facebook" /></a>
                        <a href="#" className="instagram"><i className="bi bi-instagram" /></a>
                        <a href="#" className="linkedin"><i className="bi bi-linkedin" /></a>
                    </div>
                </div>
            </header>{/* End Header */}
            <Outlet></Outlet>
        </>
    )
}