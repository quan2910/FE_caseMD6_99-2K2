import CreateCategory from "./CreateCategory";
import {useSelector} from "react-redux";
import {useEffect} from "react";

export default function ShowCategory() {
    const categories = useSelector(state => {
        return  state.category.category
    })
    const user = useSelector(state => {
        return state.user.currentUser.user.authenticUser[0]
    })

    let stt = 1
    return (
        <div className="row" style={{marginLeft:180}}>
            <button style={{width: 200, marginBottom: 20, marginLeft: 12, background:"rgb(255, 174, 129)"}}>
                <CreateCategory></CreateCategory>
            </button>
            <div className="col-lg-12">
                <table className="table table-striped" style={{background:"rgb(255, 174, 129)", width:1000, borderRadius: "1%"}}>
                    <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Name Category</th>
                        <th scope="col">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        categories.map((item)=>{
                        if(item.userId == user.idUser) {
                            return (
                                <tr>
                                    <th scope="row">{stt++}</th>
                                    <td>{item.nameCategory}</td>
                                    <td>{item.statusCategory}</td>
                                </tr>
                            )
                        }
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}