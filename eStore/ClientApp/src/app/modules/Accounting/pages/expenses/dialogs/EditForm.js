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

//expense
//Expense

// Validation schema
const ExpenseEditSchema = Yup.object().shape({
  onDate: Yup.date().required("Date is required"),
  amount: Yup.number().integer().moreThan(0).positive().min(1).required("Amount is required"),
  employeeId: Yup.number().moreThan(0).required("Paid By is required"),
  particulars: Yup.string().required("Particulars Month is required"),
  payMode: Yup.number().required("Payment Mode is required"),
  partyName: Yup.string().required("Paid To is required"),
  remarks: Yup.string().required("Expense details is required"),
  storeId: Yup.number().required("Select Store "),
});

export function EditForm({
  saveExpense,
  expense,
  actionsLoading,
  onHide,
  employeeList, partiesList, bankAccountsList
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={expense}
        validationSchema={ExpenseEditSchema}
        onSubmit={(values) => {
          saveExpense(values);
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
                      <option value="1">Dumka</option>
                      <option value="2">Jamshedpur</option>
                    </Select>
                  </div>

                   {/* Paid By */}
                   <div className="col-lg-4">
                    <Select
                      name="employeeId"
                      placeholder="Paid By"
                      label="Paid By"
                    >
                      <option value="">Select Employee</option>
                      {employeeList.map((item) => (
                        <option key={item.employeeId} value={item.employeeId}>
                          {item.staffName}
                        </option>
                      ))}
                    </Select>
                  </div>
                  
                  {/* Party  */}
                  <div className="col-lg-4">
                    <Select name="partyId" label="Ledger">
                      <option value={null} >Select Party</option>
                      {partiesList.map((item) => (
                        <option key={item.partyId} value={item.partyId}>
                          {item.partyName}
                        </option>
                      ))}
                    </Select>
                  </div>
                  
                 
                </div>
               
                <div className="form-group row">
                  {/* Date of Expense */}
                  <div className="col-lg-4">
                    <DatePickerField
                      dateFormat="yyyy-MM-dd"
                      name="onDate"
                      label="On Date"
                    />
                  </div>
                  {/*  particulars Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="particulars"
                      component={Input}
                      placeholder="Particular(s)"
                      label="Particular(s)"
                    />
                  </div>
                   {/*  Paid To Name*/}
                   <div className="col-lg-4">
                    <Field
                      name="partyName"
                      component={Input}
                      placeholder="Paid To"
                      label="Paid To"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="amount"
                      component={Input}
                      placeholder="Amount"
                      label="Amount"
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
                   {/* PayMode */}
                   <div className="col-lg-4">
                    <Select name="payMode" label="Payment Mode">
                      <option value="0">Cash</option>
                      <option value="1">Card</option>
                    </Select>
                  </div>
                 </div>
                 <div className="form-group row">
                    {/* FROM aCCOUNT */}
                    <div className="col-lg-4">
                    <Select name="bankAccountId" label="From Account">
                      <option value={null}>Select Bank Account</option>
                      {bankAccountsList.map((item) => (
                        <option key={item.bankAccountId} value={item.bankAccountId}>
                          {item.account}
                        </option>
                      ))}
                    </Select>
                  </div>                  
                 {/*  State Name*/}
                 <div className="col-lg-4">
                    <Field
                      name="paymentDetails"
                      component={Input}
                      placeholder="Payment Details"
                      label="Payment Details"
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
