import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";

import { useUIContext } from "../UIContext";

//dueRecovered
//DueRecovered


const selectedDueRecovereds = (entities, ids) => {
  const _dueRecovereds = [];
  ids.forEach((id) => {
    const dueRecovered = entities.find((el) => el.id === id);
    if (dueRecovered) {
      _dueRecovereds.push(dueRecovered);
    }
  });
  return _dueRecovereds;
};

export function FetchDialog({ show, onHide }) {
  // DueRecovereds UI Context
  const dueRecoveredsUIContext = useUIContext();
  const dueRecoveredsUIProps = useMemo(() => {
    return {
      ids: dueRecoveredsUIContext.ids,
    };
  }, [dueRecoveredsUIContext]);

  // DueRecovereds Redux state
  const { dueRecovereds } = useSelector(
    (state) => ({
      dueRecovereds: selectedDueRecovereds(
        state.dueRecovereds.entities,
        dueRecoveredsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if dueRecovereds weren't selected we should close modal
  useEffect(() => {
    if (!dueRecoveredsUIProps.ids || dueRecoveredsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dueRecoveredsUIProps.ids]);

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
            {dueRecovereds.map((dueRecovered) => (
              <tr key={`id${dueRecovered.id}`}>
                <td>{dueRecovered.id}</td>
                <td>
                  <span className="ml-3">
                    {dueRecovered.lastName}, {dueRecovered.firstName}
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
