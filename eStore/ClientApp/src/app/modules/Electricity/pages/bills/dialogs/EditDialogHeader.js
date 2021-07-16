import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

//bill
//Bill

export function EditDialogHeader({ id }) {
  // Bills Redux state
  const { billForEdit, actionsLoading } = useSelector(
    (state) => ({
      billForEdit: state.bills.billForEdit,
      actionsLoading: state.bills.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title 
  useEffect(() => {
    let _title = id ? "" : "New Bill";
    if (billForEdit && id) {
      _title = `Edit Bill No '${billForEdit.billNumber}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [billForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
