import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

//billPayment
//BillPayment

export function EditDialogHeader({ id }) {
  // BillPayments Redux state
  const { billPaymentForEdit, actionsLoading } = useSelector(
    (state) => ({
      billPaymentForEdit: state.billPayments.billPaymentForEdit,
      actionsLoading: state.billPayments.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Bill Payment";
    if (billPaymentForEdit && id) {
      _title = `Edit Bill Payment '${billPaymentForEdit.remarks}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [billPaymentForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
