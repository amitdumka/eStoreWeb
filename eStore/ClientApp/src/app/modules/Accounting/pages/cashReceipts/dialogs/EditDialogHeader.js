import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

//cashReceipt
//CashReceipt

export function EditDialogHeader({ id }) {
  // CashReceipts Redux state
  const { cashReceiptForEdit, actionsLoading } = useSelector(
    (state) => ({
      cashReceiptForEdit: state.cashReceipts.cashReceiptForEdit,
      actionsLoading: state.cashReceipts.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title counting
  useEffect(() => {
    let _title = id ? "" : "New CashReceipt";
    if (cashReceiptForEdit && id) {
      _title = `Edit cashReceipt '${cashReceiptForEdit.firstName} ${cashReceiptForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [cashReceiptForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
