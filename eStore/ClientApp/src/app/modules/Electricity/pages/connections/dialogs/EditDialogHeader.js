import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";


//Connection
//connection


export function EditDialogHeader({ id }) {
  // Connections Redux state
  const { connectionForEdit, actionsLoading } = useSelector(
    (state) => ({
      connectionForEdit: state.connections.connectionForEdit,
      actionsLoading: state.connections.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Connection";
    if (connectionForEdit && id) {
      _title = `Edit connection '${connectionForEdit.connectioName} ${connectionForEdit.consumerNumber}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [connectionForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
