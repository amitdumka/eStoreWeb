import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";


//ledgerType
//LedgerType

export function EditDialogHeader({ id }) {
  // LedgerTypes Redux state
  const { ledgerTypeForEdit, actionsLoading } = useSelector(
    (state) => ({
      ledgerTypeForEdit: state.ledgerTypes.ledgerTypeForEdit,
      actionsLoading: state.ledgerTypes.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New LedgerType";
    if (ledgerTypeForEdit && id) {
      _title = `Edit ledgerType '${ledgerTypeForEdit.ledgerTypeName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [ledgerTypeForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
