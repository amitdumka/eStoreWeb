import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/employees/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";

export function EditDialog({ id, show, onHide }) {
  // Employees UI Context
  const employeesUIContext = useUIContext();
  const employeesUIProps = useMemo(() => {
    return {
      initEmployee: employeesUIContext.initEmployee,
    };
  }, [employeesUIContext]);

  // Employees Redux state
  const dispatch = useDispatch();
  const { actionsLoading, employeeForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.employees.actionsLoading,
      employeeForEdit: state.employees.employeeForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Employee by id
    dispatch(actions.fetchEmployee(id));
  }, [id, dispatch]);

  // server request for saving employee
  const saveEmployee = (employee) => {
    employee.categoryId=parseInt(employee.categoryId);
    if (!id) {
      // server request for creating employee
      dispatch(actions.createEmployee(employee)).then(() => onHide());
    } else {
      // server request for updating employee
      dispatch(actions.updateEmployee(employee)).then(() => onHide());
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <EditDialogHeader id={id} />
      <EditForm
        saveEmployee={saveEmployee}
        actionsLoading={actionsLoading}
        employee={employeeForEdit || employeesUIProps.initEmployee}
        onHide={onHide}
      />
    </Modal>
  );
}
