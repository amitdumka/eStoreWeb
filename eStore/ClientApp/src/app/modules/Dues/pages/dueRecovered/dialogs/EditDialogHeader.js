import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

//dueRecovered
//DueRecovered

export function EditDialogHeader({ id }) {
  // DueRecovereds Redux state
  const { dueRecoveredForEdit, actionsLoading } = useSelector(
    (state) => ({
      dueRecoveredForEdit: state.dueRecovereds.dueRecoveredForEdit,
      actionsLoading: state.dueRecovereds.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New DueRecovered";
    if (dueRecoveredForEdit && id) {
      _title = `Edit dueRecovered '${dueRecoveredForEdit.firstName} ${dueRecoveredForEdit.lastName}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [dueRecoveredForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
