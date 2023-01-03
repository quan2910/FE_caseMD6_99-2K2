import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {getWallets} from "../../service/walletsService";

export default function MyWallet() {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const wallets = useSelector(state => {
        console.log('aaaaa', state)
    })
    const userId = useParams()
    console.log('id user',userId)
    const user = useSelector(state => {
        return state.user.currentUser.user.authenticUser[0]
    })
    useEffect(() => {
        dispatch(getWallets())
    },[])
    return (
        <>
            <div>

            </div>
        </>
    )
}