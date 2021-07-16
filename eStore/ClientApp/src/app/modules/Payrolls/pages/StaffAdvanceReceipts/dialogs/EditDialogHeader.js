import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

//staffAdvanceReceipt
//StaffAdvanceReceipt

export function EditDialogHeader({ id }) {
  // StaffAdvanceReceipts Redux state
  const { staffAdvanceReceiptForEdit, actionsLoading } = useSelector(
    (state) => ({
      staffAdvanceReceiptForEdit: state.staffAdvanceReceipts.staffAdvanceReceiptForEdit,
      actionsLoading: state.staffAdvanceReceipts.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Staff Advance Receipt";
    if (staffAdvanceReceiptForEdit && id) {
      _title = `Edit staff Advance Receipt # ' ${staffAdvanceReceiptForEdit.staffAdvanceReceiptId} on ${ new Date(staffAdvanceReceiptForEdit.receiptDate).toLocaleDateString()}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [staffAdvanceReceiptForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
