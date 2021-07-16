// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input,
  Select,
  DatePickerField,
} from "../../../../../../_metronic/_partials/controls";

//dailySale
//DailySale

// Validation schema
const DailySaleEditSchema = Yup.object().shape({
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
  storeId: Yup.number().moreThan(0).required("Select Store "),
});

export function EditForm({
  saveDailySale,
  dailySale,
  actionsLoading,
  onHide,
  salesmanList,payModes,storeList
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={dailySale}
        validationSchema={DailySaleEditSchema}
        onSubmit={(values) => {
          saveDailySale(values);
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
                  {/* Store */}
                  <div className="col-lg-4">
                    <Select name="storeId" label="Store">
                    {storeList &&
                        storeList.map((item) => (
                          <option key={item.storeId} value={item.storeId}>
                            {item.storeName}
                          </option>
                        ))}
                    </Select>
                  </div>
                  {/* Date of DailySale */}
                  <div className="col-lg-4">
                    <DatePickerField
                      dateFormat="yyyy-MM-dd"
                      name="saleDate"
                      label="Date"
                    />
                  </div>
                  {/* Paid By */}
                  <div className="col-lg-4">
                    <Select
                      name="salesmanId"
                      placeholder="Salesman"
                      label="Salesman"
                    >
                      <option value="">Select Salesman</option>
                      {salesmanList &&
                        salesmanList.map((item) => (
                          <option key={item.salesmanId} value={item.salesmanId}>
                            {item.salesmanName}
                          </option>
                        ))}
                    </Select>
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
