import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";

import { useUIContext } from "../UIContext";

//dayClosing
//DayClosing


const selectedDayClosings = (entities, ids) => {
  const _dayClosings = [];
  ids.forEach((id) => {
    const dayClosing = entities.find((el) => el.id === id);
    if (dayClosing) {
      _dayClosings.push(dayClosing);
    }
  });
  return _dayClosings;
};

export function FetchDialog({ show, onHide }) {
  // DayClosings UI Context
  const dayClosingsUIContext = useUIContext();
  const dayClosingsUIProps = useMemo(() => {
    return {
      ids: dayClosingsUIContext.ids,
    };
  }, [dayClosingsUIContext]);

  // DayClosings Redux state
  const { dayClosings } = useSelector(
    (state) => ({
      dayClosings: selectedDayClosings(
        state.dayClosings.entities,
        dayClosingsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if dayClosings weren't selected we should close modal
  useEffect(() => {
    if (!dayClosingsUIProps.ids || dayClosingsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayClosingsUIProps.ids]);

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
            {dayClosings.map((dayClosing) => (
              <tr key={`id${dayClosing.id}`}>
                <td>{dayClosing.id}</td>
                <td>
                  <span className="ml-3">
                    {dayClosing.lastName}, {dayClosing.firstName}
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
