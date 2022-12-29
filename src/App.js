import {Route, Routes} from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/home/Home";
import CreateWallet from "./pages/wallet/CreateWallet";
import Login from "./pages/user/login";
import Register from "./pages/user/register";
import {useEffect} from "react";
import axios from "axios";
import {useSelector} from "react-redux";

function App() {

    const idUser = useSelector(state => {
        return state.user.currentUser.user.authenticUser[0].idUser
    })

    useEffect(() => {
        axios.get('http://localhost:3000/wallet/find-by-idUser/' + idUser).then(response => {
            const wallets = response.data
            console.log('vào App')
            console.log('wallets', wallets);
        })
    }, [1])
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
