import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/cashReceipts/Actions";
import { useUIContext } from "../UIContext";

//cashReceipt
//CashReceipt

const selectedCashReceipts = (entities, ids) => {
  const _cashReceipts = [];
  ids.forEach((id) => {
    const cashReceipt = entities.find((el) => el.id === id);
    if (cashReceipt) {
      _cashReceipts.push(cashReceipt);
    }
  });
  return _cashReceipts;
};

export function UpdateStateDialog({ show, onHide }) {
  // CashReceipts UI Context
  const cashReceiptsUIContext = useUIContext();
  const cashReceiptsUIProps = useMemo(() => {
    return {
      ids: cashReceiptsUIContext.ids,
      setIds: cashReceiptsUIContext.setIds,
      queryParams: cashReceiptsUIContext.queryParams,
    };
  }, [cashReceiptsUIContext]);

  // CashReceipts Redux state
  const { cashReceipts, isLoading } = useSelector(
    (state) => ({
      cashReceipts: selectedCashReceipts(
        state.cashReceipts.entities,
        cashReceiptsUIProps.ids
      ),
      isLoading: state.cashReceipts.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!cashReceiptsUIProps.ids || cashReceiptsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cashReceiptsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update cashReceipts status by selected ids
    dispatch(actions.updateCashReceiptsStatus(cashReceiptsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchCashReceipts(cashReceiptsUIProps.queryParams)).then(
          () => {
            // clear selections list
            cashReceiptsUIProps.setIds([]);
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
          Status has been updated for selected cashReceipts
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
            {cashReceipts.map((cashReceipt) => (
              <tr key={`id${cashReceipt.id}`}>
                <td>{cashReceipt.id}</td>
                
                <td>
                  <span className="ml-3">
                    {cashReceipt.lastName}, {cashReceipt.firstName}
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
