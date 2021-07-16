import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/endOfDays/Actions";
import { useUIContext } from "../UIContext";
//endOfDay
//EndOfDay

const selectedEndOfDays = (entities, ids) => {
  const _endOfDays = [];
  ids.forEach((id) => {
    const endOfDay = entities.find((el) => el.id === id);
    if (endOfDay) {
      _endOfDays.push(endOfDay);
    }
  });
  return _endOfDays;
};

export function UpdateStateDialog({ show, onHide }) {
  // EndOfDays UI Context
  const endOfDaysUIContext = useUIContext();
  const endOfDaysUIProps = useMemo(() => {
    return {
      ids: endOfDaysUIContext.ids,
      setIds: endOfDaysUIContext.setIds,
      queryParams: endOfDaysUIContext.queryParams,
    };
  }, [endOfDaysUIContext]);

  // EndOfDays Redux state
  const { endOfDays, isLoading } = useSelector(
    (state) => ({
      endOfDays: selectedEndOfDays(
        state.endOfDays.entities,
        endOfDaysUIProps.ids
      ),
      isLoading: state.endOfDays.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!endOfDaysUIProps.ids || endOfDaysUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endOfDaysUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update endOfDays status by selected ids
    dispatch(actions.updateEndOfDaysStatus(endOfDaysUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchEndOfDays(endOfDaysUIProps.queryParams)).then(
          () => {
            // clear selections list
            endOfDaysUIProps.setIds([]);
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
          Status has been updated for selected endOfDays
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
            {endOfDays.map((endOfDay) => (
              <tr key={`id${endOfDay.id}`}>
                <td>{endOfDay.id}</td>
                
                <td>
                  <span className="ml-3">
                    {endOfDay.lastName}, {endOfDay.firstName}
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
