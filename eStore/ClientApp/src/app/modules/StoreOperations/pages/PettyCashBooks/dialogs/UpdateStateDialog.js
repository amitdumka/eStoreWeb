import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/PettyCashBooks/Actions";
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

export function UpdateStateDialog({ show, onHide }) {
  // PettyCashBooks UI Context
  const pettyCashBooksUIContext = useUIContext();
  const pettyCashBooksUIProps = useMemo(() => {
    return {
      ids: pettyCashBooksUIContext.ids,
      setIds: pettyCashBooksUIContext.setIds,
      queryParams: pettyCashBooksUIContext.queryParams,
    };
  }, [pettyCashBooksUIContext]);

  // PettyCashBooks Redux state
  const { pettyCashBooks, isLoading } = useSelector(
    (state) => ({
      pettyCashBooks: selectedPettyCashBooks(
        state.pettyCashBooks.entities,
        pettyCashBooksUIProps.ids
      ),
      isLoading: state.pettyCashBooks.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!pettyCashBooksUIProps.ids || pettyCashBooksUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pettyCashBooksUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update pettyCashBooks status by selected ids
    dispatch(actions.updatePettyCashBooksStatus(pettyCashBooksUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchPettyCashBooks(pettyCashBooksUIProps.queryParams)).then(
          () => {
            // clear selections list
            pettyCashBooksUIProps.setIds([]);
            // closing delete modal
            onHide();
          }
        );
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected pettyCashBooks
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {/*begin::Loading*/}
        {isLoading && (
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div>
        )}
        {/*end::Loading*/}
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
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Suspended</option>
            <option value="1">Active</option>
            <option value="2">Pending</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate mr-3"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
