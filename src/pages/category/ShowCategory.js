import CreateCategory from "./CreateCategory";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import EditCategory from "./EditCategory";
import {deleteCategory, getCategory} from "../../service/categoriesService";
import Swal from "sweetalert2";
import React from 'react';

export default function ShowCategory() {
    const categories = useSelector(state => {
        return  state.category.category
    })
    const user = useSelector(state => {
        return state.user.currentUser.user.authenticUser[0]
    })
    const dispatch = useDispatch()
    const handleDeleteCategory = (idCategory)=> {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await dispatch(deleteCategory(idCategory))
                    await dispatch(getCategory())
                }
            })
    }
    let stt = 1
    useEffect(()=>{
        dispatch(getCategory())
    },[])
    return (
        <div className="row" style={{marginLeft:180}}>
            <button style={{width: 200, marginBottom: 20, marginLeft: 12, background:"#82AAE3"}}>
                <CreateCategory></CreateCategory>
            </button>
            <div className="col-lg-12">
                <table className="table table-striped" style={{ width:1000, borderRadius: "1%"}}>
                    <thead>
                    <tr>
                        <th scope="col" style={{textAlign: "center"}}>STT</th>
                        <th scope="col" style={{width: 300, textAlign: "center"}}>Name Category </th>
                        <th scope="col" style={{textAlign: "center"}}>Status</th>
                        <th scope="col" colSpan={2} style={{textAlign: "center"}}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        categories.map((item)=>{
                        if(item.userId == user.idUser) {
                            return (
                                <tr>
                                    <th scope="row" style={{textAlign: "center"}}>{stt++}</th>
                                    <td style={{textAlign: "center"}}>{item.nameCategory}</td>
                                    <td style={{textAlign: "center"}}>{item.statusCategory}</td>
                                    <td style={{textAlign: "center"}} onClick={()=>{
                                        handleDeleteCategory(item.idCategory)
                                    }}>Delete</td>
                                    <td>
                                        <EditCategory idCategory={item.idCategory}></EditCategory>
                                    </td>
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

