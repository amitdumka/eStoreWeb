// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select } from "../../../../../../_metronic/_partials/controls";

//bankAccount
//BankAccount

// Validation schema
const BankAccountEditSchema = Yup.object().shape({
  account: Yup.string().required("Account is required"),
  branchName: Yup.string().required("Branch Name is required"),
  bankId: Yup.number().required("Store is required"),
  accountType: Yup.number().required("Account Type is required"),
});

export function EditForm({
  saveBankAccount,
  bankAccount,
  actionsLoading,
  onHide,
  bankList,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={bankAccount}
        validationSchema={BankAccountEditSchema}
        onSubmit={(values) => {
          saveBankAccount(values);
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
                    <Select name="accountType" label="Account Type">
                      <option value="0">Saving</option>
                      <option value="1">Current</option>
                      <option value="2">CashCredit</option>
                      <option value="3">OverDraft</option>
                      <option value="4">Others</option>
                      <option value="5">Loan</option>
                      <option value="6">CF</option>
                    </Select>
                  </div>
                  {/* Email */}
                  <div className="col-lg-4">
                    <Select name="bankId" placeholder="Bank" label="Bank">
                      <option value="">Select Bank</option>
                      {bankList.map((item) => (
                        <option key={item.bankId} value={item.bankId}>
                          {item.bankName}
                        </option>
                      ))}
                    </Select>
                  </div>
                </div>
                <div className="form-group row">
                  {/*  Father Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="account"
                      component={Input}
                      placeholder="Account No."
                      label="Account No"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="branchName"
                      component={Input}
                      placeholder="Branch Name"
                      label="BranchName"
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
