import React, {useState, useEffect} from "react"
import {Card, CardHeader, CardBody, CardTitle, Row, Col, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText} from "reactstrap"
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import {Facebook, Twitter, Youtube, Instagram, MessageCircle} from "react-feather"
import { fetchCMS, AddCMS, EditCMS } from "../../redux/actions/cms"
import { useDispatch, useSelector } from 'react-redux'

const SocialMedia = () => {

    const dispatch = useDispatch()

    const data = useSelector(state => state.cms.socialLinks[0]?.content)
    const [content, setContent] = useState()

    const initialValues = {
        facebook: data ? JSON.parse(data).facebook : "",
        instagram: data ? JSON.parse(data).instagram : "",
        youtube: data ? JSON.parse(data).youtube : "",
        twitter: data ? JSON.parse(data).twitter : "",
        whatsapp: data ? JSON.parse(data).whatsapp : ""
    }

    console.log({content})

    const validationSchema = Yup.object().shape({
        facebook: Yup.string(),
        instagram: Yup.string(),
        youtube: Yup.string(),
        twitter: Yup.string(),
        whatsapp: Yup.string()
    })

    useEffect(() => {
        dispatch(fetchCMS("social-links"))
    }, [])

    useEffect(() => {
        setContent(data)
    }, [data])

    const submitForm = (values) => {
        const rawData = {
            type: "social-links",
            content: JSON.stringify(values)
        }
        
        if (content?.length > 0) {
            dispatch(EditCMS('social-links', rawData))
            return
        }
        dispatch(AddCMS('social-links', rawData))
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
                                <Label htmlFor="facebook">Facebook</Label>
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
                                <Label htmlFor="instagram">Instagram</Label>
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
                                <Label htmlFor="youtube">Youtube</Label>
                                <InputGroup>
                                    <InputGroupAddon addonType='prepend'>
                                    <InputGroupText className={ !!(formik.touched.youtube && formik.errors.youtube) ? "border border-danger" : null}>
                                        <Youtube size={15} />
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                    type="text"
                                    name="youtube"
                                    id="youtube"
                                    {...formik.getFieldProps("youtube")}
                                    invalid={!!(formik.touched.youtube && formik.errors.youtube)}
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
                                <Label htmlFor="twitter">Twitter</Label>
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
                                <Label htmlFor="whatsapp">Whatsapp</Label>
                                <InputGroup>
                                    <InputGroupAddon addonType='prepend'>
                                    <InputGroupText className={ !!(formik.touched.whatsapp && formik.errors.whatsapp) ? "border border-danger" : null}>
                                        <MessageCircle size={15} />
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                    type="text"
                                    name="whatsapp"
                                    id="whatsapp"
                                    {...formik.getFieldProps("whatsapp")}
                                    invalid={!!(formik.touched.whatsapp && formik.errors.whatsapp)}
                                    >
                                    </Input>
                                </InputGroup>
                                <ErrorMessage
                                    name="whatsapp"
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