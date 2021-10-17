import React from "react"
import {Card, CardHeader, CardBody, CardTitle, Button, Row, Col, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import {User, Mail, Phone} from "react-feather"

import CustomSelectField from "../UtilityComponents/CustomSelectField"

const EditCustomer = () => {

    const initialValues = {
        custName:"",
        email:"",
        phoneNo:"",
        custType:"",
        KYCStatus:"",
        accStatus:""
    }

    const validationSchema = Yup.object().shape({
        custName: Yup.string().required("Required"),
        email: Yup.string().email("Please enter a valid email").required("Required"),
        phoneNo: Yup.number().positive().integer().required("Required"),
        custType: Yup.string().required("Required"),
        KYCStatus: Yup.string().required("Required"),
        accStatus: Yup.string().required("Required")
    })

    const submitForm = (values) => {
        console.log("val", values)
    }

    const customerTypeOptions = [{label:"BAC", value: "BAC"}, {label:"Regular", value:"Regular"}]

    return <Row>
        <Col sm="12" md="4">
            <Card>
                <CardHeader>
                    <CardTitle>Edit Customer</CardTitle>
                </CardHeader>
                <hr className="m-0" />
                <CardBody>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm} enableReinitialize>
                        {(formik) => {
                            return (
                                <Form>
                                    <Row>
                                        <Col sm="12" md="12">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="custName">Customer Name</Label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType='prepend'>
                                                    <InputGroupText className={ !!(formik.touched.custName && formik.errors.custName) ? "border border-danger" : null}>
                                                        <User size={15} />
                                                    </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                    type="text"
                                                    name="custName"
                                                    id="custName"
                                                    {...formik.getFieldProps("custName")}
                                                    invalid={!!(formik.touched.custName && formik.errors.custName)}
                                                    >
                                                    </Input>
                                                </InputGroup>
                                                <ErrorMessage
                                                    name="custName"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col sm="12" md="12">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="email">Email</Label>
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
                                    </Row>
                                    <Row>
                                        <Col sm="12" md="12">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="phoneNo">Phone Number</Label>
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
                                    <Row>
                                        <Col sm="12" md="12">
                                            <FormGroup className="has-icon-left position-relative">
                                                <Label htmlFor="custType">Customer Type</Label>
                                                <CustomSelectField
                                                    value={formik.values.custType}
                                                    options={customerTypeOptions}
                                                    onChange={(value) => formik.setFieldValue("custType", value.value)}
                                                    />
                                                <ErrorMessage
                                                    name="custType"
                                                    component="div"
                                                    className="field-error text-danger"
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <div className="float-right mt-1">
                                        <Button color="primary" type="submit">Update</Button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </CardBody>
            </Card>
        </Col>
    </Row>
}

export default EditCustomer