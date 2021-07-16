import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";

import { useUIContext } from "../UIContext";

//endOfDay
//EndOfDay


const selectedEndOfDays = (entities, ids) => {
  const _endOfDays = [];
  ids.forEach((id) => {
    const endOfDay = entities.find((el) => el.id === id);
    if (endOfDay) {
      _endOfDays.push(endOfDay);
    }
  });
  return _endOfDays;
};

export function FetchDialog({ show, onHide }) {
  // EndOfDays UI Context
  const endOfDaysUIContext = useUIContext();
  const endOfDaysUIProps = useMemo(() => {
    return {
      ids: endOfDaysUIContext.ids,
    };
  }, [endOfDaysUIContext]);

  // EndOfDays Redux state
  const { endOfDays } = useSelector(
    (state) => ({
      endOfDays: selectedEndOfDays(
        state.endOfDays.entities,
        endOfDaysUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if endOfDays weren't selected we should close modal
  useEffect(() => {
    if (!endOfDaysUIProps.ids || endOfDaysUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endOfDaysUIProps.ids]);

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
            {endOfDays.map((endOfDay) => (
              <tr key={`id${endOfDay.id}`}>
                <td>{endOfDay.id}</td>
                <td>
                  <span className="ml-3">
                    {endOfDay.lastName}, {endOfDay.firstName}
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
