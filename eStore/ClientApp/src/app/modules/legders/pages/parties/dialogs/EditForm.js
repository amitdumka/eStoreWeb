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



//Parties
//parties
//Party
//party

// Validation schema
const PartyEditSchema = Yup.object().shape({
  partyName: Yup.string().required("Account is required"),
  address: Yup.string().required("Branch Name is required"),
  ledgerTypeId: Yup.number().required("Store is required"),
  panNo: Yup.string().required("Account Type is required"), 
  gstNo:Yup.string().required("GSTIN is is required"),
  openningBalance: Yup.number().required("Openning Balance is required"), 
  openningDate: Yup.string().required("Date is required")
});

export function EditForm({
  saveParty,
  party,
  actionsLoading,
  onHide,
  ledgerTypes,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={party}
        validationSchema={PartyEditSchema}
        onSubmit={(values) => {
          saveParty(values);
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
                 
                  {/* LedgerType */}
                  <div className="col-lg-4">
                    <Select name="ledgerTypeId" placeholder="Ledger Type" label="Ledger Type">
                      <option value="">Select Ledger Type </option>
                      {ledgerTypes.map((item) => (
                        <option key={item.ledgerTypeId} value={item.ledgerTypeId}>
                          {item.ledgerNameType}
                        </option>
                      ))}
                    </Select>                    
                  </div>
                   {/*  Father Name*/}
                   <div className="col-lg-4">
                    <Field
                      name="partyName"
                      component={Input}
                      placeholder="Party Name"
                      label="Party Name"
                    />
                  </div>
                </div>
                <div className="form-group row">
                    {/* Date of CashPayment */}
                    <div className="col-lg-4">
                    <DatePickerField
                      dateFormat="yyyy-MM-dd"
                      name="openningDate"
                      label="Date"
                    />
                  </div>
                  {/*  Father Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="openningBalance"
                      component={Input}
                      placeholder="Balance"
                      label="Balance"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="address"
                      component={Input}
                      placeholder="Address"
                      label="Address"
                    />
                  </div>
                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="gstNo"
                      component={Input}
                      placeholder="GSTIN"
                      label="GSTIN"
                    />
                  </div>
                  {/*  State Name*/}
                  <div className="col-lg-4">
                    <Field
                      name="panNo"
                      component={Input}
                      placeholder="PAN"
                      label="PAN"
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
