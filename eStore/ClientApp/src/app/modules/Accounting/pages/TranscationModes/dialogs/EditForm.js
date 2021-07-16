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

//transcationMode
//TranscationMode

// Validation schema
const TranscationModeEditSchema = Yup.object().shape({
   // employeeId: Yup.number().moreThan(0).required("Paid By is required"),
  transcation: Yup.string().required("Transaction name  is required"),
  
});

export function EditForm({
  saveTranscationMode,
  transcationMode,
  actionsLoading,
  onHide,
   partiesList, bankAccountsList
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={transcationMode}
        validationSchema={TranscationModeEditSchema}
        onSubmit={(values) => {
          saveTranscationMode(values);
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
                
                  {/*  State Name*/}
                 <div className="col-lg-4">
                    <Field
                      name="transcation"
                      component={Input}
                      placeholder="Transcation Name"
                      label="Transcation"
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
