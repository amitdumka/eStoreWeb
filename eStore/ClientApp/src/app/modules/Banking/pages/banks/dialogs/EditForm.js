// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Input
} from "../../../../../../_metronic/_partials/controls";

//Bank
//bank

// Validation schema
const BankEditSchema = Yup.object().shape({
  bankName: Yup.string().required("Bank Name is required"),
});

export function EditForm({ saveBank, bank, actionsLoading, onHide }) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={bank}
        validationSchema={BankEditSchema}
        onSubmit={(values) => {
          saveBank(values);
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
                  {/* Staff Name */}
                  <div className="col-lg-4">
                    <Field
                      name="bankName"
                      component={Input}
                      placeholder="Bank Name"
                      label="Bank Name"
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
