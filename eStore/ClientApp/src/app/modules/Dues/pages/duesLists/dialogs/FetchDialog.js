import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";

import { useUIContext } from "../UIContext";

//duesList
//DuesList


const selectedDuesLists = (entities, ids) => {
  const _duesLists = [];
  ids.forEach((id) => {
    const duesList = entities.find((el) => el.id === id);
    if (duesList) {
      _duesLists.push(duesList);
    }
  });
  return _duesLists;
};

export function FetchDialog({ show, onHide }) {
  // DuesLists UI Context
  const duesListsUIContext = useUIContext();
  const duesListsUIProps = useMemo(() => {
    return {
      ids: duesListsUIContext.ids,
    };
  }, [duesListsUIContext]);

  // DuesLists Redux state
  const { duesLists } = useSelector(
    (state) => ({
      duesLists: selectedDuesLists(
        state.duesLists.entities,
        duesListsUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if duesLists weren't selected we should close modal
  useEffect(() => {
    if (!duesListsUIProps.ids || duesListsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duesListsUIProps.ids]);

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
            {duesLists.map((duesList) => (
              <tr key={`id${duesList.id}`}>
                <td>{duesList.id}</td>
                <td>
                  <span className="ml-3">
                    {duesList.lastName}, {duesList.firstName}
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
