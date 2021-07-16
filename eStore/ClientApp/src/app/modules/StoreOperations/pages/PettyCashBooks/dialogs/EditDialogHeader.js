import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

//pettyCashBook
//PettyCashBook

export function EditDialogHeader({ id }) {
  // PettyCashBooks Redux state
  const { pettyCashBookForEdit, actionsLoading } = useSelector(
    (state) => ({
      pettyCashBookForEdit: state.pettyCashBooks.pettyCashBookForEdit,
      actionsLoading: state.pettyCashBooks.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Petty Cash Slip ";
    if (pettyCashBookForEdit && id) {
      _title = `Edit Petty Cash Slip '${pettyCashBookForEdit.onDate}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [pettyCashBookForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
