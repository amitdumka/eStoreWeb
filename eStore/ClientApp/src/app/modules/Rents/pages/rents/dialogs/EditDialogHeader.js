import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

//rent
//Rent

export function EditDialogHeader({ id }) {
  // Rents Redux state
  const { rentForEdit, actionsLoading } = useSelector(
    (state) => ({
      rentForEdit: state.rents.rentForEdit,
      actionsLoading: state.rents.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Rent Payment";
    if (rentForEdit && id) {
      _title = `Edit Rent Payment '${rentForEdit.account}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [rentForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
