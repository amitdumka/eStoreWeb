import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";

import { useUIContext } from "../UIContext";

//staffAdvanceReceipt
//StaffAdvanceReceipt


const selectedStaffAdvanceReceipts = (entities, ids) => {
  const _staffAdvanceReceipts = [];
  ids.forEach((id) => {
    const staffAdvanceReceipt = entities.find((el) => el.id === id);
    if (staffAdvanceReceipt) {
      _staffAdvanceReceipts.push(staffAdvanceReceipt);
    }
  });
  return _staffAdvanceReceipts;
};

export function FetchDialog({ show, onHide }) {
  // StaffAdvanceReceipts UI Context
  const staffAdvanceReceiptsUIContext = useUIContext();
  const staffAdvanceReceiptsUIProps = useMemo(() => {
    return {
      ids: staffAdvanceReceiptsUIContext.ids,
    };
  }, [staffAdvanceReceiptsUIContext]);

  // StaffAdvanceReceipts Redux state
  const { staffAdvanceReceipts } = useSelector(
    (state) => ({
      staffAdvanceReceipts: selectedStaffAdvanceReceipts(
        state.staffAdvanceReceipts.entities,
        staffAdvanceReceiptsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if staffAdvanceReceipts weren't selected we should close modal
  useEffect(() => {
    if (!staffAdvanceReceiptsUIProps.ids || staffAdvanceReceiptsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staffAdvanceReceiptsUIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table table table-head-custom table-vertical-center overflow-hidden">
          <thead>
            <tr>
              <th>ID</th>
              <th>STATUS</th>
              <th>CUSTOMER</th>
            </tr>
          </thead>
          <tbody>
            {staffAdvanceReceipts.map((staffAdvanceReceipt) => (
              <tr key={`id${staffAdvanceReceipt.id}`}>
                <td>{staffAdvanceReceipt.id}</td>
                <td>
                  <span className="ml-3">
                    {staffAdvanceReceipt.lastName}, {staffAdvanceReceipt.firstName}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
