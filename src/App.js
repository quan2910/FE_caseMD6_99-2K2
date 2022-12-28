import {Route, Routes} from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/home/Home";
import CreateWallet from "./pages/wallet/CreateWallet";
import Register from "./pages/user/register";
import Login from "./pages/user/login";

function App() {
    return (
        <div>
                <Routes>
                    <Route path={"/"} element={<Register/>}/>
                    <Route path={"/login"} element={<Login></Login>}/>
                    <Route path={"/home"} element={<Home/>}/>
                    <Route path={"/create-wallet"} element={<CreateWallet/>}/>
                </Routes>
        </div>
    );
}

export default App;
