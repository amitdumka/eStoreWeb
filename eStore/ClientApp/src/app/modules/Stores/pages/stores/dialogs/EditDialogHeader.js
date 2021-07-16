import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

export function EditDialogHeader({id}){
    //Stores Redux state
    const {storeForEdit,actionsLoading}=useSelector(
        (state)=> ({
            storeForEdit:state.stores.storeForEdit,
            actionsLoading: state.stores.actionsLoading,
        }),shallowEqual
    );

    const [title, setTitle]= useState("");
    //Title couting

    useEffect(() => {
        let _title = id ? "" : "New Store";
        if(storeForEdit && id){
            _title= `Edit store '${storeForEdit.storeName}'`;
        }
        setTitle(_title);
        // eslint-disable-next-line
    },[storeForEdit, actionsLoading]);

    return(
        <>
        {actionsLoading && <ModalProgressBar variant="query" />}
        <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
         </Modal.Header>   
        </>
    );

}