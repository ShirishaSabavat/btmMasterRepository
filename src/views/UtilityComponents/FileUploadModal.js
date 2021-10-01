import React from "react"
import { FormGroup, Label, Row, Col, CustomInput } from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import SweetAlert from "react-bootstrap-sweetalert"
import Button from "reactstrap/lib/Button"

const FileUploadModal = (props) => {

    const initialValues = {
        image:""
    }

    const validationSchema = Yup.object().shape({
        image: Yup.string().required("Required")
    })

    const submitForm = (values) => {
        console.log("submited File", values)
    }

  return (
    <SweetAlert
        showConfirm={false}
        showTitle={false}
        show={props.modalState}
    >
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
            {(formik) => {
                return (
                    <Form>
                        <FormGroup className="d-flex flex-column align-items-start">
                            <Label for="image">Video Thumbnail Image</Label>
                            <CustomInput type='file' 
                                name="image"
                                id="image"
                                {...formik.getFieldProps("image")}
                            />
                            <ErrorMessage
                                name="image"
                                component="div"
                                className="field-error text-danger"
                            />
                        </FormGroup>
                        <hr />
                        <div className="d-flex justify-content-around">
                            <Button type="button" color="danger" onClick={props.onClose}>Close</Button>
                            <Button type="submit" color="success" onClick={props.onClose}>Upload</Button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    </SweetAlert>
  )
}

export default FileUploadModal
