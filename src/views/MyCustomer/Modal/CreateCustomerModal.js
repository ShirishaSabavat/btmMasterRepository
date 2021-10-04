import React from "react"
import {Button, Row, Col, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText,  Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import {Mail, Phone} from "react-feather"

const CreateCustomerModal = ({modalState, onClose}) => {

    const initialValues = {
        email:"",
        phoneNo:""
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Please enter a valid email").required("Required"),
        phoneNo: Yup.number().positive().integer().required("Required")      
    })

    const submitForm = (values) => {
        console.log("val", values)
        onClose()
    }

    return  <Modal isOpen={modalState} toggle={onClose} >
            <ModalHeader>Create Customer</ModalHeader>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm} enableReinitialize>
                {(formik) => {
                    return (
                        <Form>
                            <ModalBody>
                            <Row>
                                <Col sm="12" md="12">
                                    <FormGroup className="has-icon-left position-relative">
                                        <Label for="email">Email</Label>
                                        <InputGroup>
                                            <InputGroupAddon addonType='prepend'>
                                            <InputGroupText className={ !!(formik.touched.email && formik.errors.email) ? "border border-danger" : null}>
                                                <Mail size={15} />
                                            </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                            type="email"
                                            name="email"
                                            id="email"
                                            {...formik.getFieldProps("email")}
                                            invalid={!!(formik.touched.email && formik.errors.email)}
                                            >
                                            </Input>
                                        </InputGroup>
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className="field-error text-danger"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col sm="12" md="12">
                                    <FormGroup className="has-icon-left position-relative">
                                        <Label for="phoneNo">Phone Number</Label>
                                        <InputGroup>
                                            <InputGroupAddon addonType='prepend'>
                                            <InputGroupText className={ !!(formik.touched.phoneNo && formik.errors.phoneNo) ? "border border-danger" : null}>
                                                <Phone size={15} />
                                            </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                            type="number"
                                            name="phoneNo"
                                            id="phoneNo"
                                            {...formik.getFieldProps("phoneNo")}
                                            invalid={!!(formik.touched.phoneNo && formik.errors.phoneNo)}
                                            >
                                            </Input>
                                        </InputGroup>
                                        <ErrorMessage
                                            name="phoneNo"
                                            component="div"
                                            className="field-error text-danger"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" onClick={onClose}>Cancel</Button>
                            <Button color="primary" type="submit">Save</Button>
                        </ModalFooter>
                        </Form>
                    )
                }}
            </Formik>
  </Modal>
}

export default CreateCustomerModal