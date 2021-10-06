import React from "react"
import {Card, CardHeader, CardBody, CardTitle, Row, Col, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import {Facebook, Twitter, Linkedin, Instagram} from "react-feather"

const SocialMedia = () => {

    const initialValues = {
        facebook:"",
        instagram:"",
        twitter:"",
        linkedin:"",
        printrest:""
    }

    const validationSchema = Yup.object().shape({
        facebook: Yup.string().required("Required"),
        instagram: Yup.string().required("Required"),
        twitter: Yup.string().required("Required"),
        linkedin: Yup.string().required("Required"),
        printrest: Yup.string().required("Required")
    })

    const submitForm = (values) => {
        console.log("values", values)
    }

    return <Row>
        <Col sm="12" md="6">
            <Card>
                <CardHeader><CardTitle>Social Media Settings</CardTitle></CardHeader>
                <hr className="m-0" />
                <CardBody>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
                    {(formik) => {
                        return (<Form>
                             <FormGroup className="has-icon-left position-relative">
                                <Label for="facebook">Facebook</Label>
                                <InputGroup>
                                    <InputGroupAddon addonType='prepend'>
                                    <InputGroupText className={ !!(formik.touched.facebook && formik.errors.facebook) ? "border border-danger" : null}>
                                        <Facebook size={15} />
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                    type="text"
                                    name="facebook"
                                    id="facebook"
                                    {...formik.getFieldProps("facebook")}
                                    invalid={!!(formik.touched.facebook && formik.errors.facebook)}
                                    >
                                    </Input>
                                </InputGroup>
                                <ErrorMessage
                                    name="facebook"
                                    component="div"
                                    className="field-error text-danger"
                                />
                            </FormGroup>
                             <FormGroup className="has-icon-left position-relative">
                                <Label for="instagram">Instagram</Label>
                                <InputGroup>
                                    <InputGroupAddon addonType='prepend'>
                                    <InputGroupText className={ !!(formik.touched.instagram && formik.errors.instagram) ? "border border-danger" : null}>
                                        <Instagram size={15} />
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                    type="text"
                                    name="instagram"
                                    id="instagram"
                                    {...formik.getFieldProps("instagram")}
                                    invalid={!!(formik.touched.instagram && formik.errors.instagram)}
                                    >
                                    </Input>
                                </InputGroup>
                                <ErrorMessage
                                    name="instagram"
                                    component="div"
                                    className="field-error text-danger"
                                />
                            </FormGroup>
                             <FormGroup className="has-icon-left position-relative">
                                <Label for="twitter">Twitter</Label>
                                <InputGroup>
                                    <InputGroupAddon addonType='prepend'>
                                    <InputGroupText className={ !!(formik.touched.twitter && formik.errors.twitter) ? "border border-danger" : null}>
                                        <Twitter size={15} />
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                    type="text"
                                    name="twitter"
                                    id="twitter"
                                    {...formik.getFieldProps("twitter")}
                                    invalid={!!(formik.touched.twitter && formik.errors.twitter)}
                                    >
                                    </Input>
                                </InputGroup>
                                <ErrorMessage
                                    name="twitter"
                                    component="div"
                                    className="field-error text-danger"
                                />
                            </FormGroup>
                             <FormGroup className="has-icon-left position-relative">
                                <Label for="linkedin">Linkedin</Label>
                                <InputGroup>
                                    <InputGroupAddon addonType='prepend'>
                                    <InputGroupText className={ !!(formik.touched.linkedin && formik.errors.linkedin) ? "border border-danger" : null}>
                                        <Linkedin size={15} />
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                    type="text"
                                    name="linkedin"
                                    id="linkedin"
                                    {...formik.getFieldProps("linkedin")}
                                    invalid={!!(formik.touched.linkedin && formik.errors.linkedin)}
                                    >
                                    </Input>
                                </InputGroup>
                                <ErrorMessage
                                    name="linkedin"
                                    component="div"
                                    className="field-error text-danger"
                                />
                            </FormGroup>
                             <FormGroup className="has-icon-left position-relative">
                                <Label for="printrest">Printrest</Label>
                                <InputGroup>
                                    <Input
                                    type="text"
                                    name="printrest"
                                    id="printrest"
                                    {...formik.getFieldProps("printrest")}
                                    invalid={!!(formik.touched.printrest && formik.errors.printrest)}
                                    >
                                    </Input>
                                </InputGroup>
                                <ErrorMessage
                                    name="printrest"
                                    component="div"
                                    className="field-error text-danger"
                                />
                            </FormGroup>
                            <FormGroup className="d-flex justify-content-end">
                                <Button type="submit" color="primary">Save</Button>
                            </FormGroup>
                        </Form>)
                    }}
                </Formik>
                </CardBody>
            </Card>
        </Col>
    </Row>
}

export default SocialMedia