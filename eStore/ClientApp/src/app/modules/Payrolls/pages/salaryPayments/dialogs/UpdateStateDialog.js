import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/salaryPayments/Actions";
import { useUIContext } from "../UIContext";

//salaryPayment
//SalaryPayment

const selectedSalaryPayments = (entities, ids) => {
  const _salaryPayments = [];
  ids.forEach((id) => {
    const salaryPayment = entities.find((el) => el.id === id);
    if (salaryPayment) {
      _salaryPayments.push(salaryPayment);
    }
  });
  return _salaryPayments;
};

export function UpdateStateDialog({ show, onHide }) {
  // SalaryPayments UI Context
  const salaryPaymentsUIContext = useUIContext();
  const salaryPaymentsUIProps = useMemo(() => {
    return {
      ids: salaryPaymentsUIContext.ids,
      setIds: salaryPaymentsUIContext.setIds,
      queryParams: salaryPaymentsUIContext.queryParams,
    };
  }, [salaryPaymentsUIContext]);

  // SalaryPayments Redux state
  const { salaryPayments, isLoading } = useSelector(
    (state) => ({
      salaryPayments: selectedSalaryPayments(
        state.salaryPayments.entities,
        salaryPaymentsUIProps.ids
      ),
      isLoading: state.salaryPayments.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!salaryPaymentsUIProps.ids || salaryPaymentsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salaryPaymentsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update salaryPayments status by selected ids
    dispatch(actions.updateSalaryPaymentsStatus(salaryPaymentsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchSalaryPayments(salaryPaymentsUIProps.queryParams)).then(
          () => {
            // clear selections list
            salaryPaymentsUIProps.setIds([]);
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
          Status has been updated for selected salaryPayments
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
            {salaryPayments.map((salaryPayment) => (
              <tr key={`id${salaryPayment.id}`}>
                <td>{salaryPayment.id}</td>
                
                <td>
                  <span className="ml-3">
                    {salaryPayment.lastName}, {salaryPayment.firstName}
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
