import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/dayClosings/Actions";
import { useUIContext } from "../UIContext";
//dayClosing
//DayClosing

const selectedDayClosings = (entities, ids) => {
  const _dayClosings = [];
  ids.forEach((id) => {
    const dayClosing = entities.find((el) => el.id === id);
    if (dayClosing) {
      _dayClosings.push(dayClosing);
    }
  });
  return _dayClosings;
};

export function UpdateStateDialog({ show, onHide }) {
  // DayClosings UI Context
  const dayClosingsUIContext = useUIContext();
  const dayClosingsUIProps = useMemo(() => {
    return {
      ids: dayClosingsUIContext.ids,
      setIds: dayClosingsUIContext.setIds,
      queryParams: dayClosingsUIContext.queryParams,
    };
  }, [dayClosingsUIContext]);

  // DayClosings Redux state
  const { dayClosings, isLoading } = useSelector(
    (state) => ({
      dayClosings: selectedDayClosings(
        state.dayClosings.entities,
        dayClosingsUIProps.ids
      ),
      isLoading: state.dayClosings.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!dayClosingsUIProps.ids || dayClosingsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayClosingsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update dayClosings status by selected ids
    dispatch(actions.updateDayClosingsStatus(dayClosingsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchDayClosings(dayClosingsUIProps.queryParams)).then(
          () => {
            // clear selections list
            dayClosingsUIProps.setIds([]);
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
          Status has been updated for selected dayClosings
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
            {dayClosings.map((dayClosing) => (
              <tr key={`id${dayClosing.id}`}>
                <td>{dayClosing.id}</td>
                
                <td>
                  <span className="ml-3">
                    {dayClosing.lastName}, {dayClosing.firstName}
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
