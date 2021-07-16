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

//pettyCashBook
//PettyCashBook

// Validation schema
const PettyCashBookEditSchema = Yup.object().shape({
  onDate: Yup.date().required("Date is required"),
  openingCash: Yup.number().required("Amount is required"),
  closingCash: Yup.number().required("Amount is required"),
  systemSale: Yup.number().required("Amount is required"),
  tailoringSale: Yup.number().required("Amount is required"),
  manualSale: Yup.number().required("Amount is required"),
  cardSwipe: Yup.number().required("Amount is required"),
  bankDeposit: Yup.number().required("Amount is required"),
  totalExpenses: Yup.number().required("Amount is required"),
  totalPayments: Yup.number().required("Amount is required"),
  totalDues: Yup.number().required("Amount is required"),
  cashReciepts: Yup.number().required("Amount is required"),
  ohterReceipts: Yup.number().required("Amount is required"),
  storeId: Yup.number().moreThan(0).required("Select Store is required"),
});

export function EditForm({
  savePettyCashBook,
  pettyCashBook,
  actionsLoading,
  onHide,
  storeList,
  PettyCashSlip,
}) {
  pettyCashBook = PettyCashSlip && PettyCashSlip;
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={pettyCashBook}
        validationSchema={PettyCashBookEditSchema}
        onSubmit={(values) => {
          savePettyCashBook(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transpapettyCashBook">
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
                  {/* Date of BankDeposit */}
                  <div className="col-lg-4">
                    <DatePickerField
                      dateFormat="yyyy-MM-dd"
                      name="onDate"
                      label="On Date"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/*  Father Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="openingCash"
                      component={Input}
                      placeholder="Opening Cash"
                      label="Opening Cash"
                    />
                  </div>
                  {/*  Father Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="closingCash"
                      component={Input}
                      placeholder="Cash In Hand"
                      label="Cash In Hand"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="systemSale"
                      component={Input}
                      placeholder="System Sale"
                      label="System Sale"
                    />
                  </div>
                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="manualSale"
                      component={Input}
                      placeholder="Manual Sale"
                      label="Amount"
                    />
                  </div>
                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="tailoringSale"
                      component={Input}
                      placeholder="Tailoring Sale"
                      label="Tailoring Sale"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/*  Father Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="cashReciepts"
                      component={Input}
                      placeholder="Cash Reciepts"
                      label="Cash Reciepts"
                    />
                  </div>
                  {/*  Father Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="ohterReceipts"
                      component={Input}
                      placeholder="Other Receipts"
                      label="Other Receipts"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="cardSwipe"
                      component={Input}
                      placeholder="Card/Others"
                      label="NON Cash Sale"
                    />
                  </div>
                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="bankDeposit"
                      component={Input}
                      placeholder="Bank Deposit"
                      label="Bank Deposit"
                    />
                  </div>
                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="totalExpenses"
                      component={Input}
                      placeholder="Total Expense"
                      label="Total Expense"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="totalPayments"
                      component={Input}
                      placeholder="Total Payment"
                      label="Total Payments"
                    />
                  </div>
                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="paymentRemarks"
                      component={Input}
                      placeholder="Payment Remarks"
                      label="Payment Remarks"
                    />
                  </div>
                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="totalDues"
                      component={Input}
                      placeholder="Total Dues"
                      label="Total Dues"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="customerDuesNames"
                      component={Input}
                      placeholder="Dues List"
                      label="Dues Info"
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
