// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select } from "../../../../../../_metronic/_partials/controls";

//ledgerType
//LedgerType

// Validation schema
const LedgerTypeEditSchema = Yup.object().shape({
  ledgerNameType: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Ledger Type Name is required"),
  remark: Yup.string().required("Remark   is required"),
  category: Yup.number().required("Category is required"),
});

export function EditForm({
  saveLedgerType,
  ledgerType,
  actionsLoading,
  onHide,
  ledgerCategory,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={ledgerType}
        validationSchema={LedgerTypeEditSchema}
        onSubmit={(values) => {
          saveLedgerType(values);
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
                      name="ledgerNameType"
                      component={Input}
                      placeholder="ledger Name Type"
                      label="ledger Name Type"
                    />
                  </div>
                  {/* Last Name */}
                  <div className="col-lg-4">
                    <Field
                      name="remark"
                      component={Input}
                      placeholder="Remark"
                      label="Remark"
                    />
                  </div>
                  {/* Store */}
                  <div className="col-lg-4">
                    <Select name="category" label="Category">
                      <option>Select Category</option>
                      {ledgerCategory.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.name}
                        </option>
                      ))}
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
