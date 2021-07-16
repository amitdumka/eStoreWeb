import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/DailySales/Actions";
import * as cActions from "../../../../_redux/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";

//dailySale
//DailySale

export function EditDialog({ id, show, onHide }) {
  // DailySales UI Context
  const dailySalesUIContext = useUIContext();
  const dailySalesUIProps = useMemo(() => {
    return {
      initDailySale: dailySalesUIContext.initData,
    };
  }, [dailySalesUIContext]);

  // DailySales Redux state
  const dispatch = useDispatch();
  const {
    actionsLoading,
    dailySaleForEdit,
    salesmanList,payModes,storeList
  } = useSelector(
    (state) => ({
      actionsLoading: state.dailySales.actionsLoading,
      dailySaleForEdit: state.dailySales.dailySaleForEdit,
      salesmanList: state.dailySales.employeeEntities,
      payModes: state.commonTypes.payModes,
      storeList: state.commonTypes.storeList
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting DailySale by id
    dispatch(actions.fetchDailySale(id));
    dispatch(actions.fetchEmployees());
    dispatch(cActions.fetchEnumValue("payMode"));
    dispatch(cActions.fetchStores());
    
  }, [id, dispatch]);

  // server request for saving dailySale
  const saveDailySale = (dailySale) => {
    dailySale.payMode = parseInt(dailySale.payMode);
    if (!id) {
      // server request for creating dailySale
      dispatch(actions.createDailySale(dailySale)).then(() => onHide());
    } else {
      // server request for updating dailySale
      dispatch(actions.updateDailySale(dailySale)).then(() => onHide());
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
        saveDailySale={saveDailySale}
        actionsLoading={actionsLoading}
        dailySale={dailySaleForEdit || dailySalesUIProps.initDailySale}
        onHide={onHide}
        salesmanList={salesmanList}
        payModes={payModes}
        storeList={storeList}
      />
    </Modal>
  );
}
