import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

//cashPayment
//CashPayment

export function EditDialogHeader({ id }) {
  // CashPayments Redux state
  const { cashPaymentForEdit, actionsLoading } = useSelector(
    (state) => ({
      cashPaymentForEdit: state.cashPayments.cashPaymentForEdit,
      actionsLoading: state.cashPayments.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title counting
  useEffect(() => {
    let _title = id ? "" : "New CashPayment";
    if (cashPaymentForEdit && id) {
      _title = `Edit cashPayment '${cashPaymentForEdit.firstName} ${cashPaymentForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [cashPaymentForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
