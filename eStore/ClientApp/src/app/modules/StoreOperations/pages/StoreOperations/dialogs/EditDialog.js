import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/StoreOperations/Actions";
import * as cActions from "../../../../_redux/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import {
  EditCloseForm,
  EditHolidayForm,
  EditOpenForm,
  EditStoreClosedForm,
} from "./EditForm";
import { useUIContext } from "../UIContext";

//storeOperation
//StoreOperation

export function EditDialog({ id, show, onHide, windowName }) {
  // StoreOperations UI Context
  const uiContext = useUIContext();
  const uiProps = useMemo(() => {
    return {
      initOpen: uiContext.initOpen,
      initClose: uiContext.initClose,
      initHoliday: uiContext.initHoliday,

      initData: uiContext.initData,
      initNHoliday: uiContext.initNHolidays,
      initStoreClosed: uiContext.initStoreClosed,
    };
  }, [uiContext]);

  // StoreOperations Redux state
  const dispatch = useDispatch();
  const {
    actionsLoading,
    storeOpenForEdit,
    storeCloseForEdit,
    holidayForEdit,
    storeList,
    holidayReasons,
  } = useSelector(
    (state) => ({
      actionsLoading: state.storeOperations.actionsLoading,
      storeOpenForEdit: state.storeOperations.storeOpenForEdit,
      storeCloseForEdit: state.storeOperations.storeCloseForEdit,
      holidayForEdit: state.storeOperations.holidayForEdit,
      storeList: state.commonTypes.storeList,
      holidayReasons: state.commonTypes.holidayReasons,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting StoreOperation by id
    switch (windowName) {
      default:
        dispatch(actions.fetchStoreOpen(id));
        break;
      case "sOpen":
        dispatch(actions.fetchStoreOpen(id));
        break;
      case "sClose":
        dispatch(actions.fetchStoreClose(id));
        break;
      case "sHoliday":
        dispatch(actions.fetchStoreHoliday(id));
        break;
    }

    dispatch(cActions.fetchStores());
    dispatch(cActions.fetchEnumValue("holidayReasons"));
  }, [id, dispatch, windowName]);

  // server request for saving storeOpen
  const saveStoreOpen = (storeOpen) => {
    storeOpen.storeId = parseInt(storeOpen.storeId);

    if (!id) {
      // server request for creating storeOperation
      dispatch(actions.createStoreOpen(storeOpen)).then(() => onHide());
    } else {
      // server request for updating storeOperation
      dispatch(actions.updateStoreOpen(storeOpen)).then(() => onHide());
    }
  };
  // server request for saving storeClose
  const saveStoreClose = (storeClose) => {
    storeClose.storeId = parseInt(storeClose.storeId);

    if (!id) {
      // server request for creating storeOperation
      dispatch(actions.createStoreClose(storeClose)).then(() => onHide());
    } else {
      // server request for updating storeOperation
      dispatch(actions.updateStoreClose(storeClose)).then(() => onHide());
    }
  };
  // server request for saving storeOpen
  const saveHoliday = (holiday) => {
    holiday.storeId = parseInt(holiday.storeId);
    holiday.reason = parseInt(holiday.reason);

    if (!id) {
      // server request for creating storeOperation
      dispatch(actions.createStoreHoliday(holiday)).then(() => onHide());
    } else {
      // server request for updating storeOperation
      dispatch(actions.updateStoreHoliday(holiday)).then(() => onHide());
    }
  };

  // server request for saving pettyCashBook
  const saveStoreClosed = (CurData) => {
    let holiday = uiProps.initStoreClosed;
    holiday.onDate = CurData.onDate;
    holiday.reason = parseInt(CurData.reason);
    holiday.remarks = CurData.remarks;
    holiday.approvedBy = CurData.approvedBy;

    const isNday = CurData.nDays;
    if (isNday === true) {
      // Multiple Days
      let data = uiProps.initNHoliday;
      data.holiday = holiday;
      data.endDate = CurData.endDate;
      dispatch(actions.createNDaysHoliday(data)).then(() => onHide());
    } else {
      //Single Days
      dispatch(actions.createStoreHolidayWithAttendance(holiday)).then(() => onHide());

    }
  };

  const ShowEditForm = (winName) => {
    switch (winName.winName) {
      default:
        break;
      case "sOpen":
        return (
          <>
            <EditDialogHeader id={id} titleName="Store Open" />
            <EditOpenForm
              saveStoreOpen={saveStoreOpen}
              actionsLoading={actionsLoading}
              storeOpen={storeOpenForEdit || uiProps.initOpen}
              onHide={onHide}
              storeList={storeList}
            />
          </>
        );
      case "sClose":
        return (
          <>
            <EditDialogHeader id={id} titleName="Store Close" />
            <EditCloseForm
              saveStoreClose={saveStoreClose}
              actionsLoading={actionsLoading}
              storeClose={storeCloseForEdit || uiProps.initClose}
              onHide={onHide}
              storeList={storeList}
            />
          </>
        );
      case "sHoliday":
        return (
          <>
            <EditDialogHeader id={id} titleName="Holiday" />
            <EditHolidayForm
              saveHoliday={saveHoliday}
              actionsLoading={actionsLoading}
              holiday={holidayForEdit || uiProps.initHoliday}
              onHide={onHide}
              storeList={storeList}
              holidayReasons={holidayReasons}
            />
          </>
        );
      case "sClosed":
        return (
          <>
            <EditDialogHeader id={id} titleName="Store Closed" />
            <EditStoreClosedForm
              saveData={saveStoreClosed}
              actionsLoading={actionsLoading}
              initData={uiProps.initData}
              onHide={onHide}
              storeList={storeList}
              holidayReasons={holidayReasons}
            />
          </>
        );
    }
  };

  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {/* <EditDialogHeader id={id} />
      <EditForm
        saveStoreOpen={saveStoreOperation}
        actionsLoading={actionsLoading}
        storeOperation={
          storeOpenForEdit || uiProps.initStoreOpen
        }
        onHide={onHide}
        storeList={storeList}
      />
       */}
      <ShowEditForm winName={windowName} />
    </Modal>
  );
}
