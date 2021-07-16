import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/bills/Actions";
import { useUIContext } from "../UIContext";
//bill
//Bill

const selectedBills = (entities, ids) => {
  const _bills = [];
  ids.forEach((id) => {
    const bill = entities.find((el) => el.id === id);
    if (bill) {
      _bills.push(bill);
    }
  });
  return _bills;
};

export function UpdateStateDialog({ show, onHide }) {
  // Bills UI Context
  const billsUIContext = useUIContext();
  const billsUIProps = useMemo(() => {
    return {
      ids: billsUIContext.ids,
      setIds: billsUIContext.setIds,
      queryParams: billsUIContext.queryParams,
    };
  }, [billsUIContext]);

  // Bills Redux state
  const { bills, isLoading } = useSelector(
    (state) => ({
      bills: selectedBills(
        state.bills.entities,
        billsUIProps.ids
      ),
      isLoading: state.bills.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!billsUIProps.ids || billsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update bills status by selected ids
    dispatch(actions.updateBillsStatus(billsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchBills(billsUIProps.queryParams)).then(
          () => {
            // clear selections list
            billsUIProps.setIds([]);
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
          Status has been updated for selected bills
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
            {bills.map((bill) => (
              <tr key={`id${bill.id}`}>
                <td>{bill.id}</td>
                
                <td>
                  <span className="ml-3">
                    {bill.lastName}, {bill.firstName}
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
