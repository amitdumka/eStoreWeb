import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/rents/Actions";
import * as commonActions from "../../../../_redux/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";
//rent
//Rent

export function EditDialog({ id, show, onHide }) {
  // Rents UI Context
  const rentsUIContext = useUIContext();
  const rentsUIProps = useMemo(() => {
    return {
      initRent: rentsUIContext.initRent,
    };
  }, [rentsUIContext]);

  // Rents Redux state
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
    // server call for getting Rent by id
    dispatch(actions.fetchRent(id));
    dispatch(actions.fetchLocations());
    dispatch(commonActions.fetchEnumValue("rentType"));
    dispatch(commonActions.fetchEnumValue("payMode"));
    dispatch(commonActions.fetchStores());

  }, [id, dispatch]);

  // server request for saving rent
  const saveRent = (rent) => {
    rent.storeId=parseInt(rent.storeId);
    rent.rentedLocationId=parseInt(rent.rentedLocationId);
    rent.rentType=parseInt(rent.rentType);
    rent.mode=parseInt(rent.mode);

    if (!id) {
      // server request for creating rent
      dispatch(actions.createRent(rent)).then(() => onHide());
    } else {
      // server request for updating rent
      dispatch(actions.updateRent(rent)).then(() => onHide());
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
        saveRent={saveRent}
        actionsLoading={actionsLoading}
        rent={rentForEdit || rentsUIProps.initRent}
        onHide={onHide}
        payModes={payModes}
        rentTypes={rentTypes}
        locationList={rentedLocations}
        storeList={storeList}
      />
    </Modal>
  );
}
