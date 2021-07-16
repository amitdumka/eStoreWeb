import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/parties/Actions";
import { useUIContext } from "../UIContext";

//Parties
//parties
//Party
//party


const selectedParties = (entities, ids) => {
  const _parties = [];
  ids.forEach((id) => {
    const party = entities.find((el) => el.id === id);
    if (party) {
      _parties.push(party);
    }
  });
  return _parties;
};

export function UpdateStateDialog({ show, onHide }) {
  // Parties UI Context
  const partiesUIContext = useUIContext();
  const partiesUIProps = useMemo(() => {
    return {
      ids: partiesUIContext.ids,
      setIds: partiesUIContext.setIds,
      queryParams: partiesUIContext.queryParams,
    };
  }, [partiesUIContext]);

  // Parties Redux state
  const { parties, isLoading } = useSelector(
    (state) => ({
      parties: selectedParties(
        state.parties.entities,
        partiesUIProps.ids
      ),
      isLoading: state.parties.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!partiesUIProps.ids || partiesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partiesUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update parties status by selected ids
    dispatch(actions.updatePartiesStatus(partiesUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchParties(partiesUIProps.queryParams)).then(
          () => {
            // clear selections list
            partiesUIProps.setIds([]);
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
          Status has been updated for selected parties
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
            {parties.map((party) => (
              <tr key={`id${party.id}`}>
                <td>{party.id}</td>
                
                <td>
                  <span className="ml-3">
                    {party.lastName}, {party.firstName}
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
