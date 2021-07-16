import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/cashPayments/Actions";
import { useUIContext } from "../UIContext";

//cashPayment
//CashPayment

const selectedCashPayments = (entities, ids) => {
  const _cashPayments = [];
  ids.forEach((id) => {
    const cashPayment = entities.find((el) => el.id === id);
    if (cashPayment) {
      _cashPayments.push(cashPayment);
    }
  });
  return _cashPayments;
};

export function UpdateStateDialog({ show, onHide }) {
  // CashPayments UI Context
  const cashPaymentsUIContext = useUIContext();
  const cashPaymentsUIProps = useMemo(() => {
    return {
      ids: cashPaymentsUIContext.ids,
      setIds: cashPaymentsUIContext.setIds,
      queryParams: cashPaymentsUIContext.queryParams,
    };
  }, [cashPaymentsUIContext]);

  // CashPayments Redux state
  const { cashPayments, isLoading } = useSelector(
    (state) => ({
      cashPayments: selectedCashPayments(
        state.cashPayments.entities,
        cashPaymentsUIProps.ids
      ),
      isLoading: state.cashPayments.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!cashPaymentsUIProps.ids || cashPaymentsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cashPaymentsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update cashPayments status by selected ids
    dispatch(actions.updateCashPaymentsStatus(cashPaymentsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchCashPayments(cashPaymentsUIProps.queryParams)).then(
          () => {
            // clear selections list
            cashPaymentsUIProps.setIds([]);
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
          Status has been updated for selected cashPayments
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
            {cashPayments.map((cashPayment) => (
              <tr key={`id${cashPayment.id}`}>
                <td>{cashPayment.id}</td>
                
                <td>
                  <span className="ml-3">
                    {cashPayment.lastName}, {cashPayment.firstName}
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
