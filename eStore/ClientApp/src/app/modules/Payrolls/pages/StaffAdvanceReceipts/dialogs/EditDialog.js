import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/StaffAdvanceReceipts/Actions";
import * as commonActions from "../../../../_redux/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";

//staffAdvanceReceipt
//StaffAdvanceReceipt

export function EditDialog({ id, show, onHide }) {
  // StaffAdvanceReceipts UI Context
  const staffAdvanceReceiptsUIContext = useUIContext();
  const staffAdvanceReceiptsUIProps = useMemo(() => {
    return {
      initStaffAdvanceReceipt: staffAdvanceReceiptsUIContext.initStaffAdvanceReceipt,
    };
  }, [staffAdvanceReceiptsUIContext]);

  // StaffAdvanceReceipts Redux state
  const dispatch = useDispatch();
  const { actionsLoading, staffAdvanceReceiptForEdit ,employeeList, payModes,storeList,partyList} = useSelector(
    (state) => ({
      actionsLoading: state.staffAdvanceReceipts.actionsLoading,
      staffAdvanceReceiptForEdit: state.staffAdvanceReceipts.staffAdvanceReceiptForEdit,
      employeeList:state.staffAdvanceReceipts.employeeEntities, 
      partyList:state.staffAdvanceReceipts.partyEntities,
      payModes: state.commonTypes.payModes,
      storeList: state.commonTypes.storeList
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting StaffAdvanceReceipt by id
    dispatch(actions.fetchStaffAdvanceReceipt(id));
    dispatch(actions.fetchEmployees());
    dispatch(actions.fetchParties());
    dispatch(commonActions.fetchEnumValue("payMode"));
    dispatch(commonActions.fetchStores());
    
  }, [id, dispatch]);

  // server request for saving staffAdvanceReceipt
  const saveStaffAdvanceReceipt = (staffAdvanceReceipt) => {
    staffAdvanceReceipt.payMode=parseInt(staffAdvanceReceipt.payMode);
    
    if (!id) {
      // server request for creating staffAdvanceReceipt
      dispatch(actions.createStaffAdvanceReceipt(staffAdvanceReceipt)).then(() => onHide());
    } else {
      // server request for updating staffAdvanceReceipt
      dispatch(actions.updateStaffAdvanceReceipt(staffAdvanceReceipt)).then(() => onHide());
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
        saveStaffAdvanceReceipt={saveStaffAdvanceReceipt}
        actionsLoading={actionsLoading}
        staffAdvanceReceipt={staffAdvanceReceiptForEdit || staffAdvanceReceiptsUIProps.initStaffAdvanceReceipt}
        onHide={onHide}
        employeeList={employeeList}
        payModes={payModes}
        storeList={storeList}
        partyList={partyList}
      />
    </Modal>
  );
}
