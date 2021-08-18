import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/Salaries/Actions";
import { useUIContext } from "../UIContext";
//salary
//Salary

const selectedSalaries = (entities, ids) => {
  const _salaries = [];
  ids.forEach((id) => {
    const salary = entities.find((el) => el.id === id);
    if (salary) {
      _salaries.push(salary);
    }
  });
  return _salaries;
};

export function UpdateStateDialog({ show, onHide }) {
  // Salaries UI Context
  const salariesUIContext = useUIContext();
  const salariesUIProps = useMemo(() => {
    return {
      ids: salariesUIContext.ids,
      setIds: salariesUIContext.setIds,
      queryParams: salariesUIContext.queryParams,
    };
  }, [salariesUIContext]);

  // Salaries Redux state
  const { salaries, isLoading } = useSelector(
    (state) => ({
      salaries: selectedSalaries(
        state.salaries.entities,
        salariesUIProps.ids
      ),
      isLoading: state.salaries.actionsLoading,
    }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!salariesUIProps.ids || salariesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [salariesUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for update salaries status by selected ids
    dispatch(actions.updateSalariesStatus(salariesUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchSalaries(salariesUIProps.queryParams)).then(
          () => {
            // clear selections list
            salariesUIProps.setIds([]);
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
          Status has been updated for selected salaries
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
            {salaries.map((salary) => (
              <tr key={`id${salary.id}`}>
                <td>{salary.id}</td>
                
                <td>
                  <span className="ml-3">
                    {salary.lastName}, {salary.firstName}
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
