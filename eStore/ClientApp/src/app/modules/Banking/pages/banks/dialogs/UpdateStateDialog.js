import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/banks/Actions";
import { useUIContext } from "../UIContext";


//Bank
//bank

const selectedBanks = (entities, ids) => {
  const _banks = [];
  ids.forEach((id) => {
    const bank = entities.find((el) => el.id === id);
    if (bank) {
      _banks.push(bank);
    }
  });
  return _banks;
};

export function UpdateStateDialog({ show, onHide }) {
  // Banks UI Context
  const banksUIContext = useUIContext();
  const banksUIProps = useMemo(() => {
    return {
      ids: banksUIContext.ids,
      setIds: banksUIContext.setIds,
      queryParams: banksUIContext.queryParams,
    };
  }, [banksUIContext]);

  // Banks Redux state
  const { banks, isLoading } = useSelector(
    (state) => ({
      banks: selectedBanks(
        state.banks.entities,
        banksUIProps.ids
      ),
      isLoading: state.banks.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!banksUIProps.ids || banksUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [banksUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update banks status by selected ids
    dispatch(actions.updateBanksStatus(banksUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchBanks(banksUIProps.queryParams)).then(
          () => {
            // clear selections list
            banksUIProps.setIds([]);
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
          Status has been updated for selected banks
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
            {banks.map((bank) => (
              <tr key={`id${bank.id}`}>
                <td>{bank.id}</td>
                
                <td>
                  <span className="ml-3">
                    {bank.lastName}, {bank.firstName}
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
