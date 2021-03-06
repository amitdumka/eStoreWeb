import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/cashDetails/Actions";
import { useUIContext } from "../UIContext";
//cashDetail
//CashDetail

const selectedCashDetails = (entities, ids) => {
  const _cashDetails = [];
  ids.forEach((id) => {
    const cashDetail = entities.find((el) => el.id === id);
    if (cashDetail) {
      _cashDetails.push(cashDetail);
    }
  });
  return _cashDetails;
};

export function UpdateStateDialog({ show, onHide }) {
  // CashDetails UI Context
  const cashDetailsUIContext = useUIContext();
  const cashDetailsUIProps = useMemo(() => {
    return {
      ids: cashDetailsUIContext.ids,
      setIds: cashDetailsUIContext.setIds,
      queryParams: cashDetailsUIContext.queryParams,
    };
  }, [cashDetailsUIContext]);

  // CashDetails Redux state
  const { cashDetails, isLoading } = useSelector(
    (state) => ({
      cashDetails: selectedCashDetails(
        state.cashDetails.entities,
        cashDetailsUIProps.ids
      ),
      isLoading: state.cashDetails.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!cashDetailsUIProps.ids || cashDetailsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cashDetailsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update cashDetails status by selected ids
    dispatch(actions.updateCashDetailsStatus(cashDetailsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchCashDetails(cashDetailsUIProps.queryParams)).then(
          () => {
            // clear selections list
            cashDetailsUIProps.setIds([]);
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
          Status has been updated for selected cashDetails
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
            {cashDetails.map((cashDetail) => (
              <tr key={`id${cashDetail.id}`}>
                <td>{cashDetail.id}</td>
                
                <td>
                  <span className="ml-3">
                    {cashDetail.lastName}, {cashDetail.firstName}
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
