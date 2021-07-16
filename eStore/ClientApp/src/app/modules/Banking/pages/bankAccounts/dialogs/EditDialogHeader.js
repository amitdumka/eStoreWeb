import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

//bankAccount
//BankAccount

export function EditDialogHeader({ id }) {
  // BankAccounts Redux state
  const { bankAccountForEdit, actionsLoading } = useSelector(
    (state) => ({
      bankAccountForEdit: state.bankAccounts.bankAccountForEdit,
      actionsLoading: state.bankAccounts.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Bank Account";
    if (bankAccountForEdit && id) {
      _title = `Edit bank Account '${bankAccountForEdit.account}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [bankAccountForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
