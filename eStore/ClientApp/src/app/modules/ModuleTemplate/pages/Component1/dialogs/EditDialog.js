import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/rents/Actions";
import * as commonActions from "../../../../_redux/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";

export function EditDialog({ id, show, onHide }) {
  //  UI Context
  const uiContext = useUIContext();
  const uiProps = useMemo(() => {
    return {
      initRent: uiContext.initRent,
    };
  }, [uiContext]);

  //  Redux state
  const dispatch = useDispatch();
  const { actionsLoading, rentForEdit ,payModes,rentTypes, rentedLocations, storeList} = useSelector(
    (state) => ({
      actionsLoading: state.rents.actionsLoading,
      rentForEdit: state.rents.rentForEdit,
      payModes:state.commonTypes.payModes,
      rentTypes:state.commonTypes.rentTypes,
      rentedLocations:state.rents.rentedLocations, 
      storeList: state.commonTypes.storeList
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting  by id
    dispatch(actions.fetchRent(id));
    dispatch(actions.fetchLocations());
    dispatch(commonActions.fetchEnumValue("rentType"));
    dispatch(commonActions.fetchEnumValue("payMode"));
    dispatch(commonActions.fetchStores());

  }, [id, dispatch]);

  // server request for saving rent
  const saveData = (data) => {
    data.storeId=parseInt(data.storeId);
    data.rentedLocationId=parseInt(data.rentedLocationId);
    data.rentType=parseInt(data.rentType);
    data.mode=parseInt(data.mode);

    if (!id) {
      // server request for creating rent
      dispatch(actions.createRent(data)).then(() => onHide());
    } else {
      // server request for updating rent
      dispatch(actions.updateRent(data)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <EditDialogHeader id={id} />
      <EditForm
        saveData={saveData}
        actionsLoading={actionsLoading}
        onHide={onHide}

        rent={rentForEdit || uiProps.initRent}

        payModes={payModes}
        rentTypes={rentTypes}
        locationList={rentedLocations}
        storeList={storeList}
      />
    </Modal>
  );
}
