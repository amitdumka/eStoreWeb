import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/receipts/Actions";
import { useUIContext } from "../UIContext";

//receipt
//Receipt

const selectedReceipts = (entities, ids) => {
  const _receipts = [];
  ids.forEach((id) => {
    const receipt = entities.find((el) => el.id === id);
    if (receipt) {
      _receipts.push(receipt);
    }
  });
  return _receipts;
};

export function UpdateStateDialog({ show, onHide }) {
  // Receipts UI Context
  const receiptsUIContext = useUIContext();
  const receiptsUIProps = useMemo(() => {
    return {
      ids: receiptsUIContext.ids,
      setIds: receiptsUIContext.setIds,
      queryParams: receiptsUIContext.queryParams,
    };
  }, [receiptsUIContext]);

  // Receipts Redux state
  const { receipts, isLoading } = useSelector(
    (state) => ({
      receipts: selectedReceipts(
        state.receipts.entities,
        receiptsUIProps.ids
      ),
      isLoading: state.receipts.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!receiptsUIProps.ids || receiptsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiptsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update receipts status by selected ids
    dispatch(actions.updateReceiptsStatus(receiptsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchReceipts(receiptsUIProps.queryParams)).then(
          () => {
            // clear selections list
            receiptsUIProps.setIds([]);
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
          Status has been updated for selected receipts
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
            {receipts.map((receipt) => (
              <tr key={`id${receipt.id}`}>
                <td>{receipt.id}</td>
                
                <td>
                  <span className="ml-3">
                    {receipt.lastName}, {receipt.firstName}
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
