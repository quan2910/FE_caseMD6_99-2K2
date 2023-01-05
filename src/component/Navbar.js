import {Link, Outlet} from "react-router-dom";
import CreateTransaction from "../pages/transaction/CreateTransaction";
import {useSelector} from "react-redux";
import CreateCategory from "../pages/category/CreateCategory";
import ShowCategory from "../pages/category/ShowCategory";

export default function Navbar() {
    const user = useSelector(state => {
        return state.user.currentUser.user.authenticUser[0]
    })
    return (
        <>
            <header id="header" className="header-top row" style={{background: "#82AAE3"}}>
                <div className="containerTemplate col-12" style={{height: "0px"}}>
                    <div className="col-1" style={{display: "flex"}}>
                        <h1><Link style={{marginLeft: 20}} to={'/home'}
                                  className="nav-link"><img style={{width: "90px"}} src="Untitled.jpg"/></Link></h1>
                        <nav id="navbar" className="navbar" style={{marginLeft: 20}}>
                            <div style={{width: 500, position: "fixed"}}>
                                <ul>
                                    <Link to={'/home'} className="nav-link" >Home</Link>
                                    <Link to={'create-wallet'} className="nav-link"
                                          style={{marginLeft: 15}}>Wallet</Link>
                                    <Link to={'show-category'} className="nav-link"
                                          style={{marginLeft: 15}}>Category</Link>
                                    <Link to={'profile'} className="nav-link"
                                          style={{marginLeft: 15}}>Profile</Link>
                                    <Link to={'change-password'} style={{marginLeft: 15}}>Change
                                        Password</Link>
                                </ul>
                            </div>
                            <i className="bi bi-list mobile-nav-toggle"/>
                        </nav>
                    </div>
                    <div className="col-11">
                        <div className="col-12" style={{display: "flex", marginRight: 0}}>
                            <div className="col-10"></div>
                            <div className="col-1  d-flex justify-content-end">
                                <Link style={{marginLeft: 0, marginRight: 0}}>
                                    <img style={{borderRadius: "50%", height: 50, width: 50, marginTop: 15}}
                                         src={user.avatar == "" ? "https://bootdey.com/img/Content/avatar/avatar7.png" : user.avatar}
                                         alt="" className="img-fluid"/>
                                </Link>
                            </div>
                            <div className="col-1 " style={{lineHeight: '80px'}}><strong><Link className="nav-link" onClick={() => {
                                localStorage.clear()
                            }} style={{marginRight: 0, fontSize: 18, marginLeft: "23px", color:'white'}} to={"/"}>LogOut</Link></strong></div>
                        </div>
                    </div>
                </div>
            </header>
            <Outlet></Outlet>
        </>
    )
}