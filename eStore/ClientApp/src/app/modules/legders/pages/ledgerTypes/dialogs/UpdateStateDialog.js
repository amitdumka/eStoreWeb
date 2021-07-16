import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/ledgerTypes/Actions";
import { useUIContext } from "../UIContext";



//ledgerType
//LedgerType


const selectedLedgerTypes = (entities, ids) => {
  const _ledgerTypes = [];
  ids.forEach((id) => {
    const ledgerType = entities.find((el) => el.id === id);
    if (ledgerType) {
      _ledgerTypes.push(ledgerType);
    }
  });
  return _ledgerTypes;
};

export function UpdateStateDialog({ show, onHide }) {
  // LedgerTypes UI Context
  const ledgerTypesUIContext = useUIContext();
  const ledgerTypesUIProps = useMemo(() => {
    return {
      ids: ledgerTypesUIContext.ids,
      setIds: ledgerTypesUIContext.setIds,
      queryParams: ledgerTypesUIContext.queryParams,
    };
  }, [ledgerTypesUIContext]);

  // LedgerTypes Redux state
  const { ledgerTypes, isLoading } = useSelector(
    (state) => ({
      ledgerTypes: selectedLedgerTypes(
        state.ledgerTypes.entities,
        ledgerTypesUIProps.ids
      ),
      isLoading: state.ledgerTypes.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!ledgerTypesUIProps.ids || ledgerTypesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ledgerTypesUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update ledgerTypes status by selected ids
    dispatch(actions.updateLedgerTypesStatus(ledgerTypesUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchLedgerTypes(ledgerTypesUIProps.queryParams)).then(
          () => {
            // clear selections list
            ledgerTypesUIProps.setIds([]);
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
          Status has been updated for selected ledgerTypes
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
            {ledgerTypes.map((ledgerType) => (
              <tr key={`id${ledgerType.id}`}>
                <td>{ledgerType.id}</td>
                
                <td>
                  <span className="ml-3">
                    {ledgerType.lastName}, {ledgerType.firstName}
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
