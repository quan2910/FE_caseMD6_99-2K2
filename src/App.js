import {Route, Routes} from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/home/Home";
import CreateWallet from "./pages/wallet/CreateWallet";
import Login from "./pages/user/login";
import Register from "./pages/user/register";
import ChangePassword from "./pages/user/change-password";
import Profile from "./pages/user/profile";
import ShowCategory from "./pages/category/ShowCategory";
import ShowWallet from "./pages/wallet/ShowWallet";

function App() {
    return (
        <div className={"col-12"}>
            <div className={"col-12"}>
                <Routes>
                    <Route path={""} element={<Login/>}/>
                    <Route path={"register"} element={<Register/>}/>
                    <Route path={"home"} element={<Navbar/>}>
                        <Route path={""} element={<Home/>}/>
                        <Route path={"create-wallet"} element={<CreateWallet/>}/>
                        <Route path={"change-password"} element={<ChangePassword/>}/>
                        <Route path={"profile"} element={<Profile/>}/>
                        <Route path={"show-category"} element={<ShowCategory/>}/>
                        <Route path={"show-wallet"} element={<ShowWallet/>}/>
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
