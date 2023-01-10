import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteTransaction} from "../../service/transactionService";
import {showDetailWallet, showTransactionByMoth, showTransactionByOnlyMonth} from "../../service/walletService";
import Swal from 'sweetalert2'
const DeleteTransaction = (props) => {
    let dispatch = useDispatch()

    const user = useSelector(state => {
        return state.user.currentUser.user.authenticUser[0]
    })
    let handleDelete = async ()=>{
        await dispatch(deleteTransaction(props.idTransaction))
        if(props.date==''){
           setTimeout(async ()=>{
               clearTimeout()
               await dispatch(showDetailWallet(user.idUser))
           },1000)


        }else {
            let str =props.date
            let date = str.split('-');
            let dataMonth = {
                idUser:user.idUser,
                year:date[0],
                month:date[1]
            }
            setTimeout(async ()=>{
                clearTimeout()
                await dispatch(showTransactionByMoth(dataMonth))
                await dispatch(showTransactionByOnlyMonth(user.idUser))
            },1000)

        }
    }
    return (
            <div onClick={ async ()=>{
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
            }}><i className="fa-regular fa-trash-can"></i></div>
    );
};

export default DeleteTransaction;