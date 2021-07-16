import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

//salaryPayment
//SalaryPayment

export function EditDialogHeader({ id }) {
  // SalaryPayments Redux state
  const { salaryPaymentForEdit, actionsLoading } = useSelector(
    (state) => ({
      salaryPaymentForEdit: state.salaryPayments.salaryPaymentForEdit,
      actionsLoading: state.salaryPayments.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New SalaryPayment";
    if (salaryPaymentForEdit && id) {
      _title = `Edit salaryPayment '${salaryPaymentForEdit.firstName} ${salaryPaymentForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [salaryPaymentForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
