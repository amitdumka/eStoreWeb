import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {ModalProgressBar} from "../../../../../../_metronic/_partials/controls";

//dailySale
//DailySale

export function EditDialogHeader({ id }) {
  // DailySales Redux state
  const { dailySaleForEdit, actionsLoading } = useSelector(
    (state) => ({
      dailySaleForEdit: state.dailySales.dailySaleForEdit,
      actionsLoading: state.dailySales.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title couting
  useEffect(() => {
    let _title = id ? "" : "New Sale";
    if (dailySaleForEdit && id) {
      _title = `Edit Sale '${dailySaleForEdit.invNo} ${dailySaleForEdit.saleDate}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [dailySaleForEdit, actionsLoading]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
