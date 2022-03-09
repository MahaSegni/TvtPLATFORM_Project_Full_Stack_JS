import React, { useEffect, useState } from "react";


import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { selectConnectedUser } from "../../Redux/slices/sessionSlice";

const SendRequest = (props) => {
     
    let history=useHistory();
    let idUser = useSelector(selectConnectedUser).id
    let { id } = useParams();
    let idrcpt=id

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/friends/sendRequest/${idUser}/${idrcpt}`, { method: 'GET', })
        history.push('/suggestions')
            
    }, [])



    return (
        <>



        </>


    );
}




export default SendRequest;

