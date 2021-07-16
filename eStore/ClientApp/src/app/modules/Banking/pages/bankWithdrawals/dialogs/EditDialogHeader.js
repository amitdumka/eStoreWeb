import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

//bankWithdrawal
//BankWithdrawal

export function EditDialogHeader({ id }) {
  // BankWithdrawals Redux state
  const { bankWithdrawalForEdit, actionsLoading } = useSelector(
    (state) => ({
      bankWithdrawalForEdit: state.bankWithdrawals.bankWithdrawalForEdit,
      actionsLoading: state.bankWithdrawals.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New BankWithdrawal";
    if (bankWithdrawalForEdit && id) {
      _title = `Edit bankWithdrawal '${bankWithdrawalForEdit.firstName} ${bankWithdrawalForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [bankWithdrawalForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
