import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

//bankDeposit
//BankDeposit

export function EditDialogHeader({ id }) {
  // BankDeposits Redux state
  const { bankDepositForEdit, actionsLoading } = useSelector(
    (state) => ({
      bankDepositForEdit: state.bankDeposits.bankDepositForEdit,
      actionsLoading: state.bankDeposits.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New BankDeposit";
    if (bankDepositForEdit && id) {
      _title = `Edit bankDeposit '${bankDepositForEdit.firstName} ${bankDepositForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [bankDepositForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
