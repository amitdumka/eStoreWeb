import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/dueRecovereds/Actions";
import { useUIContext } from "../UIContext";

//dueRecovered
//DueRecovered

const selectedDueRecovereds = (entities, ids) => {
  const _dueRecovereds = [];
  ids.forEach((id) => {
    const dueRecovered = entities.find((el) => el.id === id);
    if (dueRecovered) {
      _dueRecovereds.push(dueRecovered);
    }
  });
  return _dueRecovereds;
};

export function UpdateStateDialog({ show, onHide }) {
  // DueRecovereds UI Context
  const dueRecoveredsUIContext = useUIContext();
  const dueRecoveredsUIProps = useMemo(() => {
    return {
      ids: dueRecoveredsUIContext.ids,
      setIds: dueRecoveredsUIContext.setIds,
      queryParams: dueRecoveredsUIContext.queryParams,
    };
  }, [dueRecoveredsUIContext]);

  // DueRecovereds Redux state
  const { dueRecovereds, isLoading } = useSelector(
    (state) => ({
      dueRecovereds: selectedDueRecovereds(
        state.dueRecovereds.entities,
        dueRecoveredsUIProps.ids
      ),
      isLoading: state.dueRecovereds.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!dueRecoveredsUIProps.ids || dueRecoveredsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dueRecoveredsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update dueRecovereds status by selected ids
    dispatch(actions.updateDueRecoveredsStatus(dueRecoveredsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchDueRecovereds(dueRecoveredsUIProps.queryParams)).then(
          () => {
            // clear selections list
            dueRecoveredsUIProps.setIds([]);
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
          Status has been updated for selected dueRecovereds
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
            {dueRecovereds.map((dueRecovered) => (
              <tr key={`id${dueRecovered.id}`}>
                <td>{dueRecovered.id}</td>
                
                <td>
                  <span className="ml-3">
                    {dueRecovered.lastName}, {dueRecovered.firstName}
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
