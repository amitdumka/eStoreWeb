import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/Salaries/Actions";
import * as cActions from "../../../../_redux/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";
//salary
//Salary

export function EditDialog({ id, show, onHide }) {
  // Salaries UI Context
  const salariesUIContext = useUIContext();
  const salariesUIProps = useMemo(() => {
    return {
      initSalary: salariesUIContext.initSalary,
    };
  }, [salariesUIContext]);

  // Salaries Redux state
  const dispatch = useDispatch();
  const { actionsLoading, salaryForEdit ,employeeList, salaryUnits, storeList, user} = useSelector(
    (state) => ({
      actionsLoading: state.salaries.actionsLoading,
      salaryForEdit: state.salaries.salaryForEdit,
      employeeList:state.salaries.employeeEntities,
      salaryUnits: state.commonTypes.salaryUnits, 
      user:state.auth.user,
      storeList: state.commonTypes.storeList
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Salary by id
    dispatch(actions.fetchSalary(id));
    dispatch(actions.fetchEmployees());
    dispatch(cActions.fetchEnumValue("salaryUnit"));
    dispatch(cActions.fetchStores());
    

  }, [id, dispatch]);

  // server request for saving salary
  const saveSalary = (salary) => {
    salary.status=parseInt(salary.status);
    salary.storeId= parseInt(salary.storeId);
    salary.employeeId= parseInt(salary.employeeId);
    user ? salary.userId=user.name: salary.userId="WebUI_NOTAuth";
    
    if (!id) {
      // server request for creating salary
      dispatch(actions.createSalary(salary)).then(() => onHide());
    } else {
      // server request for updating salary
      dispatch(actions.updateSalary(salary)).then(() => onHide());
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
        saveSalary={saveSalary}
        actionsLoading={actionsLoading}
        salary={salaryForEdit || salariesUIProps.initSalary}
        onHide={onHide}
        employeeList={employeeList}
        salaryUnits={salaryUnits}
        storeList={storeList}
        user={user}
      />
    </Modal>
  );
}
