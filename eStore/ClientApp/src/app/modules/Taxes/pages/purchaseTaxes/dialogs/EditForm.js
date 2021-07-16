// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select } from "../../../../../../_metronic/_partials/controls";

//purchaseTax
//PurchaseTax

// Validation schema
const PurchaseTaxEditSchema = Yup.object().shape({
  taxName: Yup.string().required("Tax Name is required"),
  taxType: Yup.number().required("Tax Type   is required"),
  compositeRate: Yup.number()
    .moreThan(0)
    .required("Composite Rate is required"),
});

export function EditForm({
  savePurchaseTax,
  purchaseTax,
  actionsLoading,
  onHide,
  taxTypes,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={purchaseTax}
        validationSchema={PurchaseTaxEditSchema}
        onSubmit={(values) => {
          savePurchaseTax(values);
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
                      name="taxName"
                      component={Input}
                      placeholder="Tax Name"
                      label="Tax Name"
                    />
                  </div>
                  {/* Last Name */}
                  <div className="col-lg-4">
                    <Field
                      name="compositeRate"
                      component={Input}
                      placeholder="Composite Rate"
                      label="Composite Rate"
                    />
                  </div>
                  {/* Store */}
                  <div className="col-lg-4">
                    <Select name="taxType" label="Tax Type">
                      <option>Select Tax Types</option>
                      {taxTypes.map((item) => (
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
