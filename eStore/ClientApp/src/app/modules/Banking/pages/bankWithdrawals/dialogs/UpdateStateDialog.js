import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/bankWithdrawals/Actions";
import { useUIContext } from "../UIContext";
//bankWithdrawal
//BankWithdrawal

const selectedBankWithdrawals = (entities, ids) => {
  const _bankWithdrawals = [];
  ids.forEach((id) => {
    const bankWithdrawal = entities.find((el) => el.id === id);
    if (bankWithdrawal) {
      _bankWithdrawals.push(bankWithdrawal);
    }
  });
  return _bankWithdrawals;
};

export function UpdateStateDialog({ show, onHide }) {
  // BankWithdrawals UI Context
  const bankWithdrawalsUIContext = useUIContext();
  const bankWithdrawalsUIProps = useMemo(() => {
    return {
      ids: bankWithdrawalsUIContext.ids,
      setIds: bankWithdrawalsUIContext.setIds,
      queryParams: bankWithdrawalsUIContext.queryParams,
    };
  }, [bankWithdrawalsUIContext]);

  // BankWithdrawals Redux state
  const { bankWithdrawals, isLoading } = useSelector(
    (state) => ({
      bankWithdrawals: selectedBankWithdrawals(
        state.bankWithdrawals.entities,
        bankWithdrawalsUIProps.ids
      ),
      isLoading: state.bankWithdrawals.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!bankWithdrawalsUIProps.ids || bankWithdrawalsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bankWithdrawalsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update bankWithdrawals status by selected ids
    dispatch(
      actions.updateBankWithdrawalsStatus(bankWithdrawalsUIProps.ids, status)
    ).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchBankWithdrawals(bankWithdrawalsUIProps.queryParams)).then(
        () => {
          // clear selections list
          bankWithdrawalsUIProps.setIds([]);
          // closing delete modal
          onHide();
        }
      );
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected bankWithdrawals
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
            {bankWithdrawals.map((bankWithdrawal) => (
              <tr key={`id${bankWithdrawal.id}`}>
                <td>{bankWithdrawal.id}</td>

                <td>
                  <span className="ml-3">
                    {bankWithdrawal.lastName}, {bankWithdrawal.firstName}
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
