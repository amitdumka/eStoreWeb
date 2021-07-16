import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/attendances/Actions";
import * as cActions from "../../../../_redux/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";
//attendance
//Attendance

export function EditDialog({ id, show, onHide }) {
  // Attendances UI Context
  const attendancesUIContext = useUIContext();
  const attendancesUIProps = useMemo(() => {
    return {
      initAttendance: attendancesUIContext.initAttendance,
    };
  }, [attendancesUIContext]);

  // Attendances Redux state
  const dispatch = useDispatch();
  const { actionsLoading, attendanceForEdit ,employeeList, attendanceUnits, storeList, user} = useSelector(
    (state) => ({
      actionsLoading: state.attendances.actionsLoading,
      attendanceForEdit: state.attendances.attendanceForEdit,
      employeeList:state.attendances.employeeEntities,
      attendanceUnits: state.commonTypes.attendanceUnits, 
      user:state.auth.user,
      storeList: state.commonTypes.storeList
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting Attendance by id
    dispatch(actions.fetchAttendance(id));
    dispatch(actions.fetchEmployees());
    dispatch(cActions.fetchEnumValue("attendanceUnit"));
    dispatch(cActions.fetchStores());
    

  }, [id, dispatch]);

  // server request for saving attendance
  const saveAttendance = (attendance) => {
    attendance.status=parseInt(attendance.status);
    attendance.storeId= parseInt(attendance.storeId);
    attendance.employeeId= parseInt(attendance.employeeId);
    user ? attendance.userId=user.name: attendance.userId="WebUI_NOTAuth";
    
    if (!id) {
      // server request for creating attendance
      dispatch(actions.createAttendance(attendance)).then(() => onHide());
    } else {
      // server request for updating attendance
      dispatch(actions.updateAttendance(attendance)).then(() => onHide());
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
        saveAttendance={saveAttendance}
        actionsLoading={actionsLoading}
        attendance={attendanceForEdit || attendancesUIProps.initAttendance}
        onHide={onHide}
        employeeList={employeeList}
        attendanceUnits={attendanceUnits}
        storeList={storeList}
        user={user}
      />
    </Modal>
  );
}
