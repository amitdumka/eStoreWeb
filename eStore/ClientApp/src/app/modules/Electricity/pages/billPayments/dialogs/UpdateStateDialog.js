import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/billPayments/Actions";
import { useUIContext } from "../UIContext";
//billPayment
//BillPayment

const selectedBillPayments = (entities, ids) => {
  const _billPayments = [];
  ids.forEach((id) => {
    const billPayment = entities.find((el) => el.id === id);
    if (billPayment) {
      _billPayments.push(billPayment);
    }
  });
  return _billPayments;
};

export function UpdateStateDialog({ show, onHide }) {
  // BillPayments UI Context
  const billPaymentsUIContext = useUIContext();
  const billPaymentsUIProps = useMemo(() => {
    return {
      ids: billPaymentsUIContext.ids,
      setIds: billPaymentsUIContext.setIds,
      queryParams: billPaymentsUIContext.queryParams,
    };
  }, [billPaymentsUIContext]);

  // BillPayments Redux state
  const { billPayments, isLoading } = useSelector(
    (state) => ({
      billPayments: selectedBillPayments(
        state.billPayments.entities,
        billPaymentsUIProps.ids
      ),
      isLoading: state.billPayments.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!billPaymentsUIProps.ids || billPaymentsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billPaymentsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update billPayments status by selected ids
    dispatch(actions.updateBillPaymentsStatus(billPaymentsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchBillPayments(billPaymentsUIProps.queryParams)).then(
          () => {
            // clear selections list
            billPaymentsUIProps.setIds([]);
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
          Status has been updated for selected billPayments
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
            {billPayments.map((billPayment) => (
              <tr key={`id${billPayment.id}`}>
                <td>{billPayment.id}</td>
                
                <td>
                  <span className="ml-3">
                    {billPayment.lastName}, {billPayment.firstName}
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
