import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/cashDetails/Actions";
import * as commonActions from "../../../../_redux/Actions";
import { EditDialogHeader } from "./EditDialogHeader";
import { EditForm } from "./EditForm";
import { useUIContext } from "../UIContext";
//cashDetail
//CashDetail

export function EditDialog({ id, show, onHide }) {
  // CashDetails UI Context
  const cashDetailsUIContext = useUIContext();
  const cashDetailsUIProps = useMemo(() => {
    return {
      initCashDetail: cashDetailsUIContext.initCashDetail,
    };
  }, [cashDetailsUIContext]);

  // CashDetails Redux state
  const dispatch = useDispatch();
  const { actionsLoading, cashDetailForEdit ,payModes,cashDetailTypes, cashDetailedLocations, storeList} = useSelector(
    (state) => ({
      actionsLoading: state.cashDetails.actionsLoading,
      cashDetailForEdit: state.cashDetails.cashDetailForEdit,
      payModes:state.cashDetails.payModes,
      cashDetailTypes:state.cashDetails.cashDetailTypes,
      cashDetailedLocations:state.cashDetails.cashDetailedLocations, 
      storeList: state.commonTypes.storeList
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting CashDetail by id
    dispatch(actions.fetchCashDetail(id));
    dispatch(actions.fetchLocations());
    dispatch(actions.fetchCashDetailTypes());
    dispatch(actions.fetchPayModes());
    dispatch(commonActions.fetchStores());

  }, [id, dispatch]);

  // server request for saving cashDetail
  const saveCashDetail = (cashDetail) => {
    cashDetail.storeId=parseInt(cashDetail.storeId);
    cashDetail.cashDetailedLocationId=parseInt(cashDetail.cashDetailedLocationId);
    cashDetail.cashDetailType=parseInt(cashDetail.cashDetailType);
    cashDetail.mode=parseInt(cashDetail.mode);

    if (!id) {
      // server request for creating cashDetail
      dispatch(actions.createCashDetail(cashDetail)).then(() => onHide());
    } else {
      // server request for updating cashDetail
      dispatch(actions.updateCashDetail(cashDetail)).then(() => onHide());
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
        saveCashDetail={saveCashDetail}
        actionsLoading={actionsLoading}
        cashDetail={cashDetailForEdit || cashDetailsUIProps.initCashDetail}
        onHide={onHide}
        payModes={payModes}
        cashDetailTypes={cashDetailTypes}
        locationList={cashDetailedLocations}
        storeList={storeList}
      />
    </Modal>
  );
}
