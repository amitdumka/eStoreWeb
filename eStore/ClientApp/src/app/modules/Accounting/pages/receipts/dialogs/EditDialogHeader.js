import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

//receipt
//Receipt

export function EditDialogHeader({ id }) {
  // Receipts Redux state
  const { receiptForEdit, actionsLoading } = useSelector(
    (state) => ({
      receiptForEdit: state.receipts.receiptForEdit,
      actionsLoading: state.receipts.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Receipt";
    if (receiptForEdit && id) {
      _title = `Edit receipt '${receiptForEdit.firstName} ${receiptForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [receiptForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
