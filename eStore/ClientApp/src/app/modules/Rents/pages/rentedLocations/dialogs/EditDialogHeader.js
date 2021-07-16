import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";


//RentedLocation
//rentedLocation


export function EditDialogHeader({ id }) {
  // RentedLocations Redux state
  const { rentedLocationForEdit, actionsLoading } = useSelector(
    (state) => ({
      rentedLocationForEdit: state.rentedLocations.rentedLocationForEdit,
      actionsLoading: state.rentedLocations.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New RentedLocation";
    if (rentedLocationForEdit && id) {
      _title = `Edit rentedLocation '${rentedLocationForEdit.firstName} ${rentedLocationForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [rentedLocationForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
