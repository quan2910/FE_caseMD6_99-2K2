import {Route, Routes} from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/home/Home";
import CreateWallet from "./pages/wallet/CreateWallet";

function App() {
    return (
        <div>
            {/* ======= Header ======= */}
            <Navbar/>
            {/* End Header */}
            <div>
                <Routes>
                    <Route path={"home"} element={<Home/>}/>
                    <Route path={"create-wallet"} element={<CreateWallet/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
