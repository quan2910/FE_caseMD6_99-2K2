import {Route, Routes} from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/home/Home";
import CreateWallet from "./pages/wallet/CreateWallet";
import Login from "./pages/user/login";
import Register from "./pages/user/register";
import ChangePassword from "./pages/user/change-password";
import UpdateProfile from "./pages/user/update-profile";

function App() {
    return (
        <div className={"col-12"}>
            {/* ======= Header ======= */}
            {/*<Navbar/>*/}
            {/* End Header */}
            <div className={"col-12"}>
                <Routes>
                    <Route path={""} element={<Login/>}/>
                    <Route path={"register"} element={<Register/>}/>
                    <Route path={"home"} element={<Navbar/>}>
                        <Route path={""} element={<Home/>}/>
                        <Route path={"create-wallet"} element={<CreateWallet/>}/>
                        <Route path={"change-password"} element={<ChangePassword/>}/>
                        <Route path={"profile"} element={<UpdateProfile/>}/>
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
