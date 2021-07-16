import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";

import { useUIContext } from "../UIContext";

//pettyCashBook
//PettyCashBook


const selectedPettyCashBooks = (entities, ids) => {
  const _pettyCashBooks = [];
  ids.forEach((id) => {
    const pettyCashBook = entities.find((el) => el.id === id);
    if (pettyCashBook) {
      _pettyCashBooks.push(pettyCashBook);
    }
  });
  return _pettyCashBooks;
};

export function FetchDialog({ show, onHide }) {
  // PettyCashBooks UI Context
  const pettyCashBooksUIContext = useUIContext();
  const pettyCashBooksUIProps = useMemo(() => {
    return {
      ids: pettyCashBooksUIContext.ids,
    };
  }, [pettyCashBooksUIContext]);

  // PettyCashBooks Redux state
  const { pettyCashBooks } = useSelector(
    (state) => ({
      pettyCashBooks: selectedPettyCashBooks(
        state.pettyCashBooks.entities,
        pettyCashBooksUIProps.ids
      ),
    }),
    shallowEqual
  );

  // if pettyCashBooks weren't selected we should close modal
  useEffect(() => {
    if (!pettyCashBooksUIProps.ids || pettyCashBooksUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pettyCashBooksUIProps.ids]);

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
            {pettyCashBooks.map((pettyCashBook) => (
              <tr key={`id${pettyCashBook.id}`}>
                <td>{pettyCashBook.id}</td>
                <td>
                  <span className="ml-3">
                    {pettyCashBook.lastName}, {pettyCashBook.firstName}
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
