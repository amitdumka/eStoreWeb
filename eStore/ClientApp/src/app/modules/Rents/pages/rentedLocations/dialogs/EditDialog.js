import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/rentedLocations/Actions";
import * as commonActions from "../../../../_redux/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";

//RentedLocation
//rentedLocation

export function EditDialog({ id, show, onHide }) {
  // RentedLocations UI Context
  const rentedLocationsUIContext = useUIContext();
  const rentedLocationsUIProps = useMemo(() => {
    return {
      initRentedLocation: rentedLocationsUIContext.initRentedLocation,
    };
  }, [rentedLocationsUIContext]);

  // RentedLocations Redux state
  const dispatch = useDispatch();
  const { actionsLoading, rentedLocationForEdit, rentTypes,storeList } = useSelector(
    (state) => ({
      actionsLoading: state.rentedLocations.actionsLoading,
      rentedLocationForEdit: state.rentedLocations.rentedLocationForEdit,
      rentTypes: state.commonTypes.rentTypes,
      storeList: state.commonTypes.storeList
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting RentedLocation by id
    dispatch(actions.fetchRentedLocation(id));
    dispatch(commonActions.fetchEnumValue("rentType"));
    dispatch(commonActions.fetchStores());
  }, [id, dispatch]);

  // server request for saving rentedLocation
  const saveRentedLocation = (rentedLocation) => {
    rentedLocation.rentType = parseInt(rentedLocation.rentType);
    rentedLocation.storeId = parseInt(rentedLocation.storeId);
    if (!id) {
      // server request for creating rentedLocation
      dispatch(actions.createRentedLocation(rentedLocation)).then(() =>
        onHide()
      );
    } else {
      // server request for updating rentedLocation
      dispatch(actions.updateRentedLocation(rentedLocation)).then(() =>
        onHide()
      );
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
        saveRentedLocation={saveRentedLocation}
        actionsLoading={actionsLoading}
        rentedLocation={
          rentedLocationForEdit || rentedLocationsUIProps.initRentedLocation
        }
        onHide={onHide}
        rentTypes={rentTypes}
        storeList={storeList}
      />
    </Modal>
  );
}
