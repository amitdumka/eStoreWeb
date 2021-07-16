import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/stores/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useStoresUIContext } from "../StoreUIContext";

export function EditDialog({ id, show, onHide}){
    // Store UI Context
    const storesUIContext= useStoresUIContext();
    const storesUIProps= useMemo(() => {
        return {
            initStore: storesUIContext.initStore,
        };
    },[storesUIContext]);

    //Store Redux state
    const dispatch = useDispatch();
    const {actionsLoading, storeForEdit}=useSelector(
        (state) => ({
            actionsLoading:state.stores.actionsLoading,
            storeForEdit: state.stores.storeForEdit,
        }),shallowEqual
    );
    useEffect(() => {
        //server request for creating store
        dispatch(actions.fetchStore(id));
    },[id, dispatch]);

    //server request for saving store
    const saveStore =(store)=>{
        if(!id){
            // server request for creating store
            dispatch(actions.createStore(store)).then(()=> onHide());
        } else{
            //server request for updating store
            dispatch(actions.updateStore(store)).then(() => onHide());
        }
        
    }
    return (
        <Modal size="lg" show={show} onHide={onHide} aria-labelledby="example-modal-sizes-title-lg">
            <EditDialogHeader id={id}/>
            <EditForm
            saveStore={saveStore}
            actionsLoading={actionsLoading}
            store={storeForEdit || storesUIProps.initStore}
            onHide={onHide}
            />

        </Modal>
    );

}