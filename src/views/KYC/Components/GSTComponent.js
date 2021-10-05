import React, {useState} from "react"
import {Row, Col, Button, FormGroup, Label, Input, InputGroup, Card, CardBody} from 'reactstrap'
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import { State }  from 'country-state-city'

import CustomSelectField from "../../UtilityComponents/CustomSelectField"

const GSTComponent  = () => {

    const [stateOptions] = useState(State.getStatesOfCountry("IN").map(values => { return {label : values.name, value : values.countryCode } }))

    const initialValues = {
        gstType:"",
        legalname:"",
        tradename:"",
        address:"",
        state:""
    }

    const validationSchema = Yup.object().shape({
        gstType: Yup.string().required("Required"),
        legalname: Yup.string().required("Required"),
        tradename: Yup.string().required("Required"),
        address: Yup.string().required("Required"),
        state: Yup.string().required("Required")
    })

    const submitForm = (values) => {
        console.log("values", values)
    }

    const gstTypeOptions = [{label: "Consumer", value: "consumer"}]

    return <Row>
        <Col sm="12" md="6">
            <Card>
                <CardBody>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
                {(formik) => {
                    return (<Form>
                        <FormGroup className="has-icon-left position-relative">
                            <Label for="legalname">Legal legalname</Label>
                            <InputGroup>
                                <Input
                                type="text"
                                name="legalname"
                                id="legalname"
                                {...formik.getFieldProps("legalname")}
                                invalid={!!(formik.touched.legalname && formik.errors.legalname)}
                                >
                                </Input>
                            </InputGroup>
                            <ErrorMessage
                                name="legalname"
                                component="div"
                                className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup className="has-icon-left position-relative">
                            <Label for="tradename">Trade Name</Label>
                            <InputGroup>
                                <Input
                                type="text"
                                name="tradename"
                                id="tradename"
                                {...formik.getFieldProps("tradename")}
                                invalid={!!(formik.touched.tradename && formik.errors.tradename)}
                                >
                                </Input>
                            </InputGroup>
                            <ErrorMessage
                                name="tradename"
                                component="div"
                                className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label For="state">State</Label>
                            <CustomSelectField
                                value={formik.values.state}
                                options={stateOptions}
                                onChange={value => formik.setFieldValue("state", value.value)}
                            />
                            <ErrorMessage
                            name="state"
                            component="div"
                            className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup className="has-icon-left position-relative">
                            <Label for="address">Address</Label>
                            <InputGroup>
                                <Input
                                type="text"
                                name="address"
                                id="address"
                                {...formik.getFieldProps("address")}
                                invalid={!!(formik.touched.address && formik.errors.address)}
                                >
                                </Input>
                            </InputGroup>
                            <ErrorMessage
                                name="address"
                                component="div"
                                className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label For="gstType">GST Type</Label>
                            <CustomSelectField
                                value={formik.values.gstType}
                                options={gstTypeOptions}
                                onChange={value => formik.setFieldValue("gstType", value.value)}
                            />
                            <ErrorMessage
                            name="gstType"
                            component="div"
                            className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup className="d-flex justify-content-end">
                            <Button type="submit" color="success">Save</Button>
                        </FormGroup>
                    </Form>)
                }}
            </Formik>          
            </CardBody>
            </Card>
        </Col>
    </Row>
}

export default GSTComponent