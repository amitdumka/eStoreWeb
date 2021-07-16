import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

//transcationMode
//TranscationMode

export function EditDialogHeader({ id }) {
  // TranscationModes Redux state
  const { transcationModeForEdit, actionsLoading } = useSelector(
    (state) => ({
      transcationModeForEdit: state.transcationModes.transcationModeForEdit,
      actionsLoading: state.transcationModes.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Transaction Mode";
    if (transcationModeForEdit && id) {
      _title = `Edit transcation Mode '${transcationModeForEdit.transcation}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [transcationModeForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
