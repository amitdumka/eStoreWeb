import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/employees/Actions";
import * as cActions from "../../../../_redux/Actions";
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
  const { actionsLoading, employeeForEdit,storeList ,employeeType} = useSelector(
    (state) => ({
      actionsLoading: state.employees.actionsLoading,
      employeeForEdit: state.employees.employeeForEdit,
      storeList: state.commonTypes.storeList,
      employeeType: state.commonTypes.employeeType,

    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Employee by id
    dispatch(actions.fetchEmployee(id));
    dispatch(cActions.fetchEnumValue("employeeType"));
    dispatch(cActions.fetchStores());
  }, [id, dispatch]);

  // server request for saving employee
  const saveEmployee = (employee) => {
    //console.log(employee);
    employee.category=parseInt(employee.category);
    if (!id) {
      // server request for creating employee
      dispatch(actions.createEmployee(employee)).then(() => onHide());
    } else {
      //console.log(employee);
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
        employeeType={employeeType}
        storeList={storeList}

      />
    </Modal>
  );
}
