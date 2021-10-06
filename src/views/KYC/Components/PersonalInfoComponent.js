import React from "react"
import {Row, Col, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText, Card, CardBody} from 'reactstrap'
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"

import {User, Mail, Phone} from "react-feather"

const PersonalInfoComponent  = () => {

    const initialValues = {
        name:"",
        email:"",
        phno:""
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Required"),
        email: Yup.string().email().required("Required"),
        phno: Yup.string().required("Required")
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
                            <Label for="name">Name</Label>
                            <InputGroup>
                                <InputGroupAddon addonType='prepend'>
                                <InputGroupText className={ !!(formik.touched.name && formik.errors.name) ? "border border-danger" : null}>
                                    <User size={15} />
                                </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                type="text"
                                name="name"
                                id="name"
                                {...formik.getFieldProps("name")}
                                invalid={!!(formik.touched.name && formik.errors.name)}
                                >
                                </Input>
                            </InputGroup>
                            <ErrorMessage
                                name="name"
                                component="div"
                                className="field-error text-danger"
                            />
                        </FormGroup>
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
                        <FormGroup className="has-icon-left position-relative">
                            <Label for="phno">Mobile No</Label>
                            <InputGroup>
                            <InputGroupAddon addonType='prepend'>
                            <InputGroupText className={ !!(formik.touched.phno && formik.errors.phno) ? "border border-danger" : null}>
                                <Phone size={15} />
                            </InputGroupText>
                            </InputGroupAddon>
                                <Input
                                type="text"
                                name="phno"
                                id="phno"
                                {...formik.getFieldProps("phno")}
                                invalid={!!(formik.touched.phno && formik.errors.phno)}
                                >
                                </Input>
                            </InputGroup>
                            <ErrorMessage
                                name="phno"
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

export default PersonalInfoComponent