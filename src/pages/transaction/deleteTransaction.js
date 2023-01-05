import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteTransaction} from "../../service/transactionService";
import {showDetailWallet, showTransactionByMoth} from "../../service/walletService";
import Swal from 'sweetalert2'
import {getCategory} from "../../service/categoriesService";
import {findById} from "../../service/userService";
const DeleteTransaction = (props) => {
    let dispatch = useDispatch()
   const [a,setA]=useState(true)
    const user = useSelector(state => {
        return state.user.currentUser.user.authenticUser[0]
    })
    let handleDelete = async ()=>{
        await dispatch(deleteTransaction(props.idTransaction))
        if(props.date==''){
            await dispatch(showDetailWallet(user.idUser))
        }else {
            let str =props.date
            let date = str.split('-');
            let dataMonth = {
                idUser:user.idUser,
                year:date[0],
                month:date[1]
            }
            await dispatch(showTransactionByMoth(dataMonth))
          setA(false)
        }
    }
    return (

            <button onClick={ async ()=>{
              await  Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then(async (result) => {

                    if (result.isConfirmed) { await handleDelete()
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    }
                })
            }}>delete</button>

    );
};

export default DeleteTransaction;