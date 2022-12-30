import {Link, Outlet} from "react-router-dom";
import CreateTransaction from "../pages/transaction/CreateTransaction";
import {useSelector} from "react-redux";
import CreateCategory from "../pages/category/CreateCategory";

export default function Navbar() {
    const user = useSelector(state => {
        return state.user.currentUser.user.authenticUser[0]
    })
    return (
        <>
            <header id="header" className="header-top row" style={{background: "linear-gradient(to right, #FF4B2B, #FF416C)"}}>
                <div className="containerTemplate col-12" style={{height:50}}>
                    <div className="col-3" style={{display:"flex"}}>
                        <h1> <Link style={{marginLeft: 20, marginTop: 20, color:"black"}} to={'/home'} className="nav-link">Wallet </Link></h1>

                        <nav id="navbar" className="navbar" style={{marginLeft: 20}}>
                            <div  style={{marginTop:2, width:500}}>
                                <ul>

                                <Link to={'/home'} className="nav-link" style={{color:"black"}}>Home</Link>
                                    <Link to={'create-wallet'} className="nav-link" style={{marginLeft:15, color:"black"}}>Create Wallet</Link>
                                    <Link className="nav-link" style={{marginLeft:15}}>
                                        <CreateCategory></CreateCategory>
                                    </Link>
                                </ul>
                            </div>
                            <i className="bi bi-list mobile-nav-toggle" />
                        </nav>
                    </div>
                    <div className="col-9">
                        <div className="col-12" style={{display:"flex", marginRight:0}}>
                            <div className="col-10"></div>
                            <div className="col-1"><Link style={{marginLeft: 0}}><img style={{borderRadius: "50%", height:50, width:50}} src="https://i.pinimg.com/236x/2d/e2/2e/2de22e8aa035d55e5f2e01d9607cac88.jpg" alt="" className="img-fluid"/></Link></div>
                            <div className="col-1" ><Link className="nav-link" onClick={() => {
                                localStorage.clear()
                            }} style={{marginRight: "8px"}} to={"/"}>LogOut</Link></div>
                        </div>
                    </div>
                </div>
            </header>
            <Outlet></Outlet>
        </>
    )
}