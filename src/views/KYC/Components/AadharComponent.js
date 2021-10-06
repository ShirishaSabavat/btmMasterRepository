import React from "react"
import {Row, Col, Button, FormGroup, Label, Input, InputGroup, Card, CardBody, CustomInput} from 'reactstrap'
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"

const AadharComponent  = () => {

    const initialValues = {
        aadharNo:"",
        aadharAttachment:""
    }

    const validationSchema = Yup.object().shape({
        aadharNo: Yup.number().positive().required("Required"),
        aadharAttachment: Yup.string().required("Required")
    })

    const submitForm = (values) => {
        console.log("values", values)
    }

    return <Row>
        <Col sm="12" md="6">
            <Card>
                <CardBody>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
                {(formik) => {
                    return (<Form>
                        <FormGroup className="has-icon-left position-relative">
                            <Label for="aadharNo">Aadhar Number</Label>
                            <InputGroup>
                                <Input
                                type="number"
                                name="aadharNo"
                                id="aadharNo"
                                {...formik.getFieldProps("aadharNo")}
                                invalid={!!(formik.touched.aadharNo && formik.errors.aadharNo)}
                                >
                                </Input>
                            </InputGroup>
                            <ErrorMessage
                                name="aadharNo"
                                component="div"
                                className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup className="has-icon-left position-relative">
                            <Label for="aadharAttachment">Aadhar Attachment</Label>
                            <CustomInput
                            type="file"
                            name="aadharAttachment"
                            id="aadharAttachment"
                            {...formik.getFieldProps("aadharAttachment")}
                            invalid={!!(formik.touched.aadharAttachment && formik.errors.aadharAttachment)}
                            >
                            </CustomInput>
                            <ErrorMessage
                                name="aadharAttachment"
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

export default AadharComponent