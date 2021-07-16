import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/bankDeposits/Actions";
import { useUIContext } from "../UIContext";
//bankDeposit
//BankDeposit

const selectedBankDeposits = (entities, ids) => {
  const _bankDeposits = [];
  ids.forEach((id) => {
    const bankDeposit = entities.find((el) => el.id === id);
    if (bankDeposit) {
      _bankDeposits.push(bankDeposit);
    }
  });
  return _bankDeposits;
};

export function UpdateStateDialog({ show, onHide }) {
  // BankDeposits UI Context
  const bankDepositsUIContext = useUIContext();
  const bankDepositsUIProps = useMemo(() => {
    return {
      ids: bankDepositsUIContext.ids,
      setIds: bankDepositsUIContext.setIds,
      queryParams: bankDepositsUIContext.queryParams,
    };
  }, [bankDepositsUIContext]);

  // BankDeposits Redux state
  const { bankDeposits, isLoading } = useSelector(
    (state) => ({
      bankDeposits: selectedBankDeposits(
        state.bankDeposits.entities,
        bankDepositsUIProps.ids
      ),
      isLoading: state.bankDeposits.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!bankDepositsUIProps.ids || bankDepositsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bankDepositsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update bankDeposits status by selected ids
    dispatch(
      actions.updateBankDepositsStatus(bankDepositsUIProps.ids, status)
    ).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchBankDeposits(bankDepositsUIProps.queryParams)).then(
        () => {
          // clear selections list
          bankDepositsUIProps.setIds([]);
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
          Status has been updated for selected bankDeposits
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
            {bankDeposits.map((bankDeposit) => (
              <tr key={`id${bankDeposit.id}`}>
                <td>{bankDeposit.id}</td>

                <td>
                  <span className="ml-3">
                    {bankDeposit.lastName}, {bankDeposit.firstName}
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
