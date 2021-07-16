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

//bankDeposit
//BankDeposit

// Validation schema
const BankDepositEditSchema = Yup.object().shape({
  onDate: Yup.date().required("Date is required"),
  inNameOf: Yup.string().required("Status is required"),
  storeId: Yup.number().required("Store is required"),
  chequeNo:Yup.string().required("Cheque No is required"), 
  amount: Yup.number().moreThan(0).required("Amount is required"), 
  bankAccountId: Yup.number().moreThan(0).required("Select Bank Account"), 
  
});

export function EditForm({
  saveBankDeposit,
  bankDeposit,
  actionsLoading,
  onHide,
  bankList,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={bankDeposit}
        validationSchema={BankDepositEditSchema}
        onSubmit={(values) => {
          saveBankDeposit(values);
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
                  {/* Bank */}
                  <div className="col-lg-4">
                    <Select name="bankAccountId" placeholder="Bank" label="Bank">
                      <option value="">Select Bank</option>
                      {bankList ? (
                        bankList.map((item) => (
                          <option
                            key={item.bankAccountId}
                            value={item.bankAccountId}
                          >
                            {item.account}
                          </option>
                        ))
                      ) : (
                        <option>No Item Found</option>
                      )}
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
                  {/*  Father Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="chequeNo"
                      component={Input}
                      placeholder="Cheque No"
                      label="Cheque No"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  {/*  Father Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="inNameOf"
                      component={Input}
                      placeholder="Name"
                      label="Name"
                    />
                  </div>
                  {/*  Father Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="amount"
                      component={Input}
                      placeholder="Amount"
                      label="Amount"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Select
                      name="payMode"
                      placeholder="PayMode"
                      label="PayMode"
                    >
                      <option value="">Select Mode</option>
                      <option value="1">Cash</option>
                      <option value="2">Card</option>
                      <option value="3">Cheque</option>
                      <option value="4">RTGS</option>
                      <option value="5">NEFT</option>
                      <option value="6">IMPS</option>
                      <option value="7">Others</option>
                    </Select>
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
                  {/*  Father Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="details"
                      component={Input}
                      placeholder="Details"
                      label="Details"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field name="isInHouse" type="checkbox" />
                    {} Aprajita Retails <br />
                    <Select name="storeId" placeholder="Store" label="Store">
                      <option value="1">Dumka</option>
                      <option value="2">Jamshedpur</option>
                    </Select>
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
