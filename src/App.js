import {Route, Routes} from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/home/Home";
import CreateWallet from "./pages/wallet/CreateWallet";
import Login from "./pages/user/login";
import Register from "./pages/user/register";

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
                    </Route>

                </Routes>
            </div>
        </div>
    );
}

export default App;
