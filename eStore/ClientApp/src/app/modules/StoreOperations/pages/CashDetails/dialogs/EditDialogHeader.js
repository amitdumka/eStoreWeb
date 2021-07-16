import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

//cashDetail
//CashDetail

export function EditDialogHeader({ id }) {
  // CashDetails Redux state
  const { cashDetailForEdit, actionsLoading } = useSelector(
    (state) => ({
      cashDetailForEdit: state.cashDetails.cashDetailForEdit,
      actionsLoading: state.cashDetails.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New CashDetail Payment";
    if (cashDetailForEdit && id) {
      _title = `Edit CashDetail Payment '${cashDetailForEdit.account}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [cashDetailForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
