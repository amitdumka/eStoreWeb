import React, { useState, useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/DailySales/Actions";
import * as cActions from "../../../../_redux/Actions";
import { useUIContext } from "../UIContext";
import { Formik, Form, Field } from "formik";
import { makeStyles } from "@material-ui/core";
import * as Yup from "yup";
import {
  Input,
  Select,
  DatePickerField,
} from "../../../../../../_metronic/_partials/controls";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { Button } from "@material-ui/core";
import {
  Select as MSelect,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

export default function PaymentsDialog({ id, show, onHide, payMode }) {
  const uiContext = useUIContext();
  const uiProps = useMemo(() => {
    return {
      initDailySale: uiContext.initData,
    };
  }, [uiContext]);

  // DailySales Redux state
  const dispatch = useDispatch();
  //const [curPayMode, setCurPayMode] = useState(0);

  const {
    actionsLoading,
    dailySaleForEdit,
    payModes,
    paymentForEdit,
  } = useSelector(
    (state) => ({
      actionsLoading: state.dailySales.actionsLoading,
      paymentForEdit: state.dailySales.paymentForEdit,
      dailySaleForEdit: state.dailySales.dailySaleForEdit,
      payModes: state.commonTypes.payModes,
    }),
    shallowEqual
  );

  useEffect(() => {
    // server call for getting DailySale by id
    dispatch(actions.fetchDailySale(id));
    dispatch(actions.fetchDailySale(id)); //Payment
    dispatch(cActions.fetchEnumValue("payMode"));
  }, [id, dispatch]);

  //dailySaleForEdit && setCurPayMode(dailySaleForEdit.payMode);
  //payMode  && console.log("PayMode= "+payMode);
  console.log(`iD=${id} \t Mode=${payMode}`);
  console.log(onHide);

  const ShowEditForm = ({ payMode }) => {
    //{ Cash, Card, RTGS, NEFT, IMPS, Wallets, Cheques, DemandDraft, Points, Others, Coupons, MixPayments, UPI }
    // console.log("ShowEditForm: "+payMode);
    const mode = parseInt(payMode);
    switch (mode) {
      case 1:
        return (
          <>
            <CardPaymentForm
              actionsLoading={actionsLoading}
              onHide={onHide}
              dailySale={dailySaleForEdit}
              edcList=""
              cardModes=""
              saveData="saveDataFunction"
              payment={paymentForEdit || intitCard}
              payModes={payModes}
            />
          </>
        ); //card
      case 2:
      //rtgs
      case 3:
      //rtgs neft
      case 4:
      //rtgs imps
      case 6:
      //cheques
      // eslint-disable-next-line no-fallthrough
      case 7:
        return (
          <>
            <BankPaymentForm
              actionsLoading={actionsLoading}
              onHide={onHide}
              dailySale={dailySaleForEdit}
              saveData="saveDataFunction"
              payment={paymentForEdit || initBank}
              payModes={payModes}
            />
          </>
        ); // dd
      case 8:
        return (
          <>
            <PointRedeemedForm
              actionsLoading={actionsLoading}
              onHide={onHide}
              dailySale={dailySaleForEdit}
              saveData="saveDataFunction"
              payment={paymentForEdit || initBank}
              payModes={payModes}
            />
          </>
        ); //points
      case 9:
        break; //others
      case 10:
        return (
          <>
            <CouponPaymentForm
              actionsLoading={actionsLoading}
              onHide={onHide}
              dailySale={dailySaleForEdit}
              saveData="saveDataFunction"
              payment={paymentForEdit || initBank}
              payModes={payModes}
            />
          </>
        ); //Coupons
      case 11:
        return (
          <>
            {" "}
            <MixPaymentDialog
              actionsLoading={actionsLoading}
              onHide={onHide}
              dailySale={dailySaleForEdit}
              saveData="saveDataFunction"
              payment={paymentForEdit || initBank}
              payModes={payModes}
            />{" "}
          </>
        ); //MixPayments
      case 5:
      //wallets
      // eslint-disable-next-line no-fallthrough
      case 12:
        return (
          <>
            <WalletPaymentForm
              actionsLoading={actionsLoading}
              onHide={onHide}
              dailySale={dailySaleForEdit}
              saveData="saveDataFunction"
              payment={paymentForEdit || initBank}
              payModes={payModes}
            />
          </>
        ); //UPI
      default:
        console.log("PayMode= " + payMode);
      //return (<></>);
    }
  };
  return (
    <Modal
      size="lg"
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <DialogHeader id={id} />
      <ShowEditForm payMode={payMode} />
    </Modal>
  );
}

export function DialogHeader({ id, paymentId }) {
  // DailySales Redux state
  const { dailySaleForEdit, actionsLoading, paymentForEdit } = useSelector(
    (state) => ({
      dailySaleForEdit: state.dailySales.dailySaleForEdit,
      paymentForEdit: state.dailySales.paymentForEdit,
      actionsLoading: state.dailySales.actionsLoading,
    }),
    shallowEqual
  );

  const [title, setTitle] = useState("");
  // Title
  useEffect(() => {
    let _title = paymentId ? "" : "New Payment";

    if (dailySaleForEdit && _title == "New Payment") {
      _title = _title + `  For Sale Inv: ${dailySaleForEdit.invNo}`;
    }
    if (dailySaleForEdit && paymentForEdit && paymentId) {
      _title = `Payment for Sale '${dailySaleForEdit.invNo}'`;
    }

    setTitle(_title);
    // eslint-disable-next-line
  }, [dailySaleForEdit, actionsLoading, paymentForEdit]);

  return (
    <>
      {actionsLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
      </Modal.Header>
    </>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(1, 0, 1),
  },
}));
export function MixPaymentDialog({
  actionsLoading,
  payment,
  onHide,
  payModes,
  saveData,
  dailySale,
  edcList,
  cardModes,
  paymentList,
}) {
  const classes = useStyles();
  const [pMode, setPMode] = useState(11);
  const handleAddPay = () => {
    return (
      <>
        <MixPayments
          actionsLoading={actionsLoading}
          payment={payment}
          onHide={onHide}
          payModes={payModes}
          saveData={saveData}
          edcList={edcList}
          cardModes={cardModes}
          dailySale={dailySale}
        />
      </>
    );
  };

  return (
    <>
      <div className="m-4 p-2">
        <div className="row mb-3 mt-3 ">
          <div className="col-lg-4 text-primary">
            Invoice No: {dailySale && dailySale.invNo}
          </div>
          <div className="col-lg-4 text-primary">
            Date: {dailySale && dailySale.saleDate}
          </div>
          <div className="col-lg-4 text-primary">
            Mode: {dailySale && payModes[dailySale.payMode].name}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 text-info">
            <label className="text-primary mr-3 ml-3" id="lbSelect">
              Payment Mode{" "}
            </label>
            <MSelect
              name="newPayMode"
              label="Payment Mode"
              labelId="lbSelect"
              value={11}
              autoWidth
              onChange={(val) => {
                setPMode(val.target.value);
              }}
            >
              {payModes &&
                payModes.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.name}
                  </option>
                ))}
            </MSelect>
          </div>
          <div className="col-lg-4">
            <Button className="btn btn-success btn-sm" onClick={handleAddPay}>
              Add Payment
            </Button>{" "}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-5">
            <Typography variant="h6" className="text-danger mt-3  ">
              Payments
            </Typography>
            <List dense={true}>
              {paymentList ? (
                paymentList.map((item) => (
                  <>
                    <ListItem>
                      <ListItemText
                        primary={"Payment Id: "+item.paymentId+" Payment Mode: "+item.Mode}
                        secondary={"Amount: "+item.Amount}
                      />
                    </ListItem>
                    ,
                  </>
                ))
              ) : (
                <ListItem>
                  <ListItemText
                    primary="No payment added"
                    secondary={"Add Payment for Invoice"}
                  />
                </ListItem>
              )}
            </List>
          </div>
        </div>
      </div>
    </>
  );
}

export function EditForm({
  actionsLoading,
  payment,
  onHide,
  payModes,
  saveData,
}) {
  // Validation schema
  const PaymentEditSchema = Yup.object().shape({
    saleDate: Yup.date().required("Date is required"),
    amount: Yup.number()
      .integer()
      .moreThan(0)
      .positive()
      .min(1)
      .required("Amount is required"),
    salesmanId: Yup.number()
      .moreThan(0)
      .required("Salesman is required"),
    invNo: Yup.string().required("Invoice No is required"),
    payMode: Yup.number().required("Payment Mode is required"),
    cashAmount: Yup.number()
      .integer()
      .moreThan(0)
      .positive()
      .min(1)
      .required("Cash Amount is required"),
    remarks: Yup.string().required("DailySale details is required"),
  });

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={payment}
        validationSchema={PaymentEditSchema}
        onSubmit={(values) => {
          saveData(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  {/* Date of DailySale */}
                  <div className="col-lg-4">
                    <DatePickerField
                      dateFormat="yyyy-MM-dd"
                      name="saleDate"
                      label="Date"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/*  particulars Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="invNo"
                      component={Input}
                      placeholder="Invoice No"
                      label="Invoice No"
                    />
                  </div>
                  {/*  particulars Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="amount"
                      component={Input}
                      placeholder="Amount"
                      label="Amount"
                    />
                  </div>
                  {/* PayMode */}
                  <div className="col-lg-4">
                    <Select name="payMode" label="Payment Mode">
                      {payModes &&
                        payModes.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.name}
                          </option>
                        ))}
                    </Select>
                  </div>
                </div>
                <div className="form-group row">
                  {/*  Paid To Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="cashAmount"
                      component={Input}
                      placeholder="Cash Amount"
                      label="Cash Amount"
                    />
                  </div>
                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="remarks"
                      component={Input}
                      placeholder="Remarks"
                      label="Remarks"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field name="isDue" type="checkbox" /> Due
                    <span className="text-danger ml-3 mr-3">
                      <Field name="isSaleReturn" type="checkbox" /> Sales Return
                    </span>
                  </div>
                  <div className="col-lg-4">
                    <Field name="isManualBill" type="checkbox" /> Manual Bill
                    <span className="text-primary ml-3 mr-3">
                      <Field name="isTailoringBill" type="checkbox" /> Tailoring{" "}
                    </span>
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}

export function BankPaymentForm({
  actionsLoading,
  payment,
  onHide,
  payModes,
  saveData,
  dailySale,
}) {
  const PaymentEditSchema = Yup.object().shape({
    amount: Yup.number()
      .integer()
      .moreThan(0)
      .positive()
      .min(1)
      .required("Amount is required"),
    remarks: Yup.string().required("DailySale details is required"),
    referenceNumber: Yup.string().required("Reference Number  is required"),
  });

  payment.payMode = dailySale ? dailySale.payMode : 6;

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={payment}
        validationSchema={PaymentEditSchema}
        onSubmit={(values) => {
          saveData(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  {/* Date of DailySale */}
                  <div className="col-lg-4">
                    <label className="text-primary">
                      On Date : {dailySale && dailySale.saleDate}
                    </label>
                  </div>
                  {/* Invoice No */}
                  <div className="col-lg-4">
                    <label className="text-success">
                      Invoice No : {dailySale && dailySale.invNo}
                    </label>
                  </div>
                  {/* Payment Mode */}
                  <div className="col-lg-4">
                    <label className="text-info">
                      Payment Mode :{" "}
                      {dailySale && payModes[dailySale.payMode].name}
                    </label>
                  </div>
                </div>

                <div className="form-group row">
                  {/* PayMode */}
                  <div className="col-lg-4">
                    <Select name="payMode" label="Payment Mode">
                      {payModes &&
                        payModes.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.name}
                          </option>
                        ))}
                    </Select>
                  </div>
                  {/*  particulars Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="amount"
                      component={Input}
                      placeholder="Amount"
                      label="Amount"
                    />
                  </div>
                  {/*  particulars Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="referenceNumber"
                      component={Input}
                      placeholder="ReferenceNumber"
                      label="ReferenceNumber"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="remarks"
                      component={Input}
                      placeholder="Remarks"
                      label="Remarks"
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}

export function CouponPaymentForm({
  actionsLoading,
  payment,
  onHide,
  payModes,
  saveData,
  dailySale,
}) {
  const PaymentEditSchema = Yup.object().shape({
    amount: Yup.number()
      .integer()
      .moreThan(0)
      .positive()
      .min(1)
      .required("Amount is required"),
    remarks: Yup.string().required("DailySale details is required"),
    couponNumber: Yup.string().required("Coupon Number is required"),
  });
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={payment}
        validationSchema={PaymentEditSchema}
        onSubmit={(values) => {
          saveData(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  {/* Date of DailySale */}
                  <div className="col-lg-4">
                    <label className="text-primary">
                      On Date : {dailySale && dailySale.saleDate}
                    </label>
                  </div>
                  {/* Invoice No */}
                  <div className="col-lg-4">
                    <label className="text-success">
                      Invoice No : {dailySale && dailySale.invNo}
                    </label>
                  </div>
                  {/* Payment Mode */}
                  <div className="col-lg-4">
                    <label className="text-info">
                      Payment Mode :{" "}
                      {dailySale && payModes[dailySale.payMode].name}
                    </label>
                  </div>
                </div>

                <div className="form-group row">
                  {/* PayMode */}
                  {/* <div className="col-lg-4">
                    <Select name="payMode" label="Payment Mode">
                      {payModes &&
                        payModes.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.name}
                          </option>
                        ))}
                    </Select>
                  </div> */}
                  {/*  particulars Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="amount"
                      component={Input}
                      placeholder="Amount"
                      label="Amount"
                    />
                  </div>
                  {/*  particulars Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="couponNumber"
                      component={Input}
                      placeholder="CouponNumber"
                      label="CouponNumber"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="remarks"
                      component={Input}
                      placeholder="Remarks"
                      label="Remarks"
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}

export function PointRedeemedForm({
  actionsLoading,
  payment,
  onHide,
  payModes,
  saveData,
  dailySale,
}) {
  const PaymentEditSchema = Yup.object().shape({
    amount: Yup.number()
      .integer()
      .moreThan(0)
      .positive()
      .min(1)
      .required("Amount is required"),
    remarks: Yup.string().required("DailySale details is required"),
    customerMobileNumber: Yup.string().required(
      "Customer Mobile Number  is required"
    ),
  });
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={payment}
        validationSchema={PaymentEditSchema}
        onSubmit={(values) => {
          saveData(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  {/* Date of DailySale */}
                  <div className="col-lg-4">
                    <label className="text-primary">
                      On Date : {dailySale && dailySale.saleDate}
                    </label>
                  </div>
                  {/* Invoice No */}
                  <div className="col-lg-4">
                    <label className="text-success">
                      Invoice No : {dailySale && dailySale.invNo}
                    </label>
                  </div>
                  {/* Payment Mode */}
                  <div className="col-lg-4">
                    <label className="text-info">
                      Payment Mode{" : "}
                      {dailySale && payModes[dailySale.payMode].name}
                    </label>
                  </div>
                </div>

                <div className="form-group row">
                  {/* PayMode */}
                  {/* <div className="col-lg-4">
                    <Select name="payMode" label="Payment Mode">
                      {payModes &&
                        payModes.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.name}
                          </option>
                        ))}
                    </Select>
                  </div> */}
                  {/*  particulars Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="amount"
                      component={Input}
                      placeholder="Amount"
                      label="Amount"
                    />
                  </div>
                  {/*  particulars Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="customerMobileNumber"
                      component={Input}
                      placeholder="Customer Mobile Number"
                      label="Customer Mobile Number"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="remarks"
                      component={Input}
                      placeholder="Remarks"
                      label="Remarks"
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
export function WalletPaymentForm({
  actionsLoading,
  payment,
  onHide,
  payModes,
  saveData,
  dailySale,
}) {
  const PaymentEditSchema = Yup.object().shape({
    walletType: Yup.number().required("Wallet Type is required"),
    amount: Yup.number()
      .integer()
      .moreThan(0)
      .positive()
      .min(1)
      .required("Amount is required"),
    remarks: Yup.string().required("DailySale details is required"),
    customerMobileNoRef: Yup.string().required(
      "Customer Mobile Number with ref is  is required"
    ),
  });
  payment.payMode = dailySale ? dailySale.payMode : 9;

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={payment}
        validationSchema={PaymentEditSchema}
        onSubmit={(values) => {
          saveData(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  {/* Date of DailySale */}
                  <div className="col-lg-4">
                    <label className="text-props">
                      On Date {dailySale && dailySale.saleDate}
                    </label>
                  </div>
                  {/* Invoice No */}
                  <div className="col-lg-4">
                    <label className="text-success">
                      Invoice No {dailySale && dailySale.invNo}
                    </label>
                  </div>
                  {/* Payment Mode */}
                  <div className="col-lg-4">
                    <label className="text-info">
                      Payment Mode{" "}
                      {dailySale && payModes[dailySale.payMode].name}
                    </label>
                  </div>
                </div>

                <div className="form-group row">
                  {/* PayMode */}
                  <div className="col-lg-4">
                    <Select name="payMode" label="Payment Mode">
                      {payModes &&
                        payModes.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.name}
                          </option>
                        ))}
                    </Select>
                  </div>
                  {/*  particulars Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="amount"
                      component={Input}
                      placeholder="Amount"
                      label="Amount"
                    />
                  </div>
                  {/*  particulars Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="customerMobileNoRef"
                      component={Input}
                      placeholder="with reference Number"
                      label="Wallet Mobile Number"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="remarks"
                      component={Input}
                      placeholder="Remarks"
                      label="Remarks"
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}

export function CardPaymentForm({
  actionsLoading,
  payment,
  onHide,
  payModes,
  saveData,
  edcList,
  cardModes,
  dailySale,
}) {
  const PaymentEditSchema = Yup.object().shape({
    amount: Yup.number()
      .integer()
      .moreThan(0)
      .positive()
      .min(1)
      .required("Amount is required"),
    eDCId: Yup.number()
      .integer()
      .moreThan(0)
      .positive()
      .required("Select EDC"),
    cardTypes: Yup.number()
      .positive()
      .required("Select Card Types"),
    onDate: Yup.date().required("Date is required"),
    cardEndingNumber: Yup.number()
      .positive()
      .required("Card Last Digit is required"),
  });
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={payment}
        validationSchema={PaymentEditSchema}
        onSubmit={(values) => {
          saveData(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  {/* Date of DailySale */}
                  <div className="col-lg-4">
                    <label className="text-info">
                      On Date {dailySale && dailySale.saleDate}
                    </label>
                  </div>
                  {/* Invoice No */}
                  <div className="col-lg-4">
                    <label className="text-danger">
                      Invoice No {dailySale && dailySale.invNo}
                    </label>
                  </div>
                  {/* Payment Mode */}
                  <div className="col-lg-4">
                    <label className="text-success">
                      Payment Mode{" "}
                      {dailySale && payModes[dailySale.payMode].name}
                    </label>
                  </div>
                </div>

                <div className="form-group row">
                  {/*  particulars Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="amount"
                      component={Input}
                      placeholder="Amount"
                      label="Amount"
                    />
                  </div>
                  {/* Date of DailySale */}
                  <div className="col-lg-4">
                    <DatePickerField
                      dateFormat="yyyy-MM-dd"
                      name="onDate"
                      label="Payment Date"
                    />
                  </div>
                  {/* PayMode */}
                  <div className="col-lg-4">
                    <Select name="EDCId" label="EDC">
                      {edcList &&
                        edcList.map((item) => (
                          <option key={item.eDCId} value={item.eDCId}>
                            {item.eDCName}
                          </option>
                        ))}
                    </Select>
                  </div>
                </div>
                <div className="form-group row">
                  {/* PayMode */}
                  <div className="col-lg-4">
                    <Select name="cardTypes" label="Card Types">
                      {cardModes &&
                        cardModes.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.name}
                          </option>
                        ))}
                    </Select>
                  </div>
                  {/*  particulars Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="cardEndingNumber"
                      component={Input}
                      placeholder="Card Ending Number"
                      label="Card Ending Number"
                    />
                  </div>
                  {/*  particulars Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="authCode"
                      component={Input}
                      placeholder="Auth Code"
                      label="Auth Code"
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                onClick={onHide}
                className="btn btn-light btn-elevate"
              >
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary btn-elevate"
              >
                Save
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}

export function MixPayments({
  actionsLoading,
  payment,
  onHide,
  payModes,
  saveData,
  edcList,
  cardModes,
  dailySale,
}) {
  const [selectedPayMode, setSelectedPayMode] = useState(0);
  const ShowSelectForm = (payMode) => {
    //{ Cash, Card, RTGS, NEFT, IMPS, Wallets, Cheques, DemandDraft, Points, Others, Coupons, MixPayments, UPI }
    switch (payMode) {
      case 1:
        return (
          <>
            <CardPaymentForm
              actionsLoading={actionsLoading}
              onHide={onHide}
              dailySale={dailySale}
              edcList=""
              cardModes=""
              saveData="saveDataFunction"
              payment={payment || intitCard}
              payModes={payModes}
            />
          </>
        ); //card
      case 2:
      //rtgs
      case 3:
      //rtgs neft
      case 4:
      //rtgs imps
      case 6:
      //cheques
      // eslint-disable-next-line no-fallthrough
      case 7:
        return (
          <>
            <BankPaymentForm
              actionsLoading={actionsLoading}
              onHide={onHide}
              dailySale={dailySale}
              saveData="saveDataFunction"
              payment={payment || initBank}
              payModes={payModes}
            />
          </>
        ); // dd
      case 8:
        return (
          <>
            <PointRedeemedForm
              actionsLoading={actionsLoading}
              onHide={onHide}
              dailySale={dailySale}
              saveData="saveDataFunction"
              payment={payment || initBank}
              payModes={payModes}
            />
          </>
        ); //points
      case 9:
        break; //others
      case 10:
        return (
          <>
            <CouponPaymentForm
              actionsLoading={actionsLoading}
              onHide={onHide}
              dailySale={dailySale}
              saveData="saveDataFunction"
              payment={payment || initBank}
              payModes={payModes}
            />
          </>
        ); //Coupons
      case 5:
      //wallets
      // eslint-disable-next-line no-fallthrough
      case 12:
        return (
          <>
            <WalletPaymentForm
              actionsLoading={actionsLoading}
              onHide={onHide}
              dailySale={dailySale}
              saveData="saveDataFunction"
              payment={payment || initBank}
              payModes={payModes}
            />
          </>
        ); //UPI

      default:
        break;
    }
  };
  return (
    <>
      <Select
        name="selectedPayMode"
        onSelect={(value) => {
          setSelectedPayMode(value);
        }}
      >
        {payModes &&
          payModes.map((item) => (
            <option value={item.value} key={item.value}>
              {item.name}
            </option>
          ))}
      </Select>
      <Button
        className="btn btn-primary btn-sm"
        onClick={() => {
          ShowSelectForm(selectedPayMode);
        }}
      >
        Add Payment
      </Button>
    </>
  );
}

// public int EDCTranscationId { get; set; }
// public int EDCId { get; set; }
// public virtual EDC CardMachine { get; set; }
// [DataType(DataType.Currency), Column(TypeName = "money")]
// public decimal Amount { get; set; }
// [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
// public DateTime OnDate { get; set; }
// public string CardEndingNumber { get; set; }
// public CardMode CardTypes { get; set; }
// public string InvoiceNumber { get; set; }
// public int DailySaleId { get; set; }
// public virtual DailySale DailySale { get; set; }
// public string InvoiceNumber { get; set; }
// [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
// public DateTime OnDate { get; set; }
// [DataType(DataType.Currency), Column(TypeName = "money")]
// public decimal Amount { get; set; }
// public string Remarks { get; set; }
// public PayMode Mode { get; set; }
// public int StoreId { get; set; }
// public virtual Store Store { get; set; }
// public string UserId { get; set; }
// public bool IsReadOnly { get; set; }

const intitCard = {
  eDCTranscationId: 0,
  eDCId: 0,
  eDC: null,
  amount: 0.0,
  onDate: new Date(),
  cardEndingNumber: "",
  cardTypes: 0,
  invoiceNumber: "",
  authCode: 0,
  storeId: 1,
  store: null,
  userId: "webUI",
  isReadOnly: false,
};

const initBank = {
  bankPaymentId: 0,
  dailySaleId: 0,
  dailySale: null,
  invoiceNumber: null,
  onDate: new Date(),
  amount: 0.0,
  remarks: null,
  mode: 0,
  referenceNumber: null,
  storeId: 1,
  store: null,
  userId: "webUI",
  isReadOnly: false,
};
const intitPoint = {
  pointRedeemedId: 0,
  dailySaleId: 0,
  dailySale: null,
  invoiceNumber: null,
  onDate: new Date(),
  amount: 0.0,
  remarks: null,
  mode: 0,
  customerMobileNumber: null,
  storeId: 1,
  store: null,
  userId: "webUI",
  isReadOnly: false,
};
const initWallet = {
  walletPaymentId: 0,
  dailySaleId: 0,
  dailySale: null,
  invoiceNumber: null,
  onDate: new Date(),
  amount: 0.0,
  remarks: null,
  mode: 0,
  customerMobileNoRef: null,
  walletType: 0,
  storeId: 1,
  store: null,
  userId: "webUI",
  isReadOnly: false,
};
const initCoupon = {
  couponPaymentId: 0,
  dailySaleId: 0,
  dailySale: null,
  invoiceNumber: null,
  onDate: new Date(),
  amount: 0.0,
  remarks: null,
  mode: 0,
  couponNumber: null,
  storeId: 1,
  store: null,
  userId: "webUI",
  isReadOnly: false,
};
