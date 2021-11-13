import {useState, useEffect} from 'react'
import { useSkin } from '@hooks/useSkin'
import { useHistory } from 'react-router-dom'
import { Mail, MapPin, Phone, User, Send } from 'react-feather'
import { Row, Col, FormGroup, Input, Button, InputGroup, InputGroupAddon, InputGroupText, Label } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import {Grid} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"

import {AddMessage, getLandingPageData} from "../../redux/actions/landingPage/index"

const ContactUs = () => {

    const dispatch = useDispatch()
    const userData = useSelector(state => state.auth.userData)
    const landingPageData = useSelector(state => state.landingPage.landingPage[0])

    useEffect(() => {
        getLandingPageData()
    }, [])

    const initialValues = {
        uname:"",
        email:"",
        phone:"",
        message:""
    }

    const validationSchema = Yup.object().shape({
        uname: Yup.string().required("Required"),
        email: Yup.string().required("Required"),
        phone: Yup.number().positive().required("Required"),
        message: Yup.string().required("Required")
    })

    const submitForm = (values, {resetForm}) => {
        console.log("values", values)
        const rawData = {
            name: values.uname,
            email: values.email,
            phone: values.phone,
            message: values.message
        }
        dispatch(AddMessage(rawData, resetForm))
    }

    const history = useHistory()
    const [skin, setSkin] = useSkin()

  return (
    <Grid container spacing={4}>
        <Grid className="bg-white"  item xs={12} className="mt-2">
            <Row>
                <Col sm="12" md="8">
                    <Row className=''>
                        <Col className='d-lg-flex flex-column' lg='12' sm='12'>
                        <h3 className="px-5 my-2" style={{fontWeight: 'bold', fontSize: 38}}>Contact Us</h3>
                        <div className='w-100 px-5'>
                            <h2>Business Aacharaya</h2>
                            <p>What is Spirituality? - Over the years many definitions have been given to it. One such definition is connecting one's soul with everything positive around us. It is the attempt to be at peace with oneself. It is the art of letting go. The yearning for this spiritual experience has led to demand for spirituality courses.
        View more- Explore Online Courses and Certifications</p>
                            <div className="text-center">
                                <img className="img-fluid m-2" width="520" src="/assets/svg/contact_us.svg" />
                            </div>
                        </div>
                        </Col>
                    </Row>
                </Col>
                <Col sm="12" md="4" className=" mt-3">
                    <div className='m-2 card card-body'>

                    <h2 className="mb-1">Inquiry Form</h2>  
                        
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
                        {(formik) => {
                            return <Form>
                                <FormGroup className="has-icon-left position-relative">
                                    <Label htmlFor="uname">Name</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType='prepend'>
                                        <InputGroupText className={ !!(formik.touched.uname && formik.errors.uname) ? "border border-danger" : null}>
                                            <User size={15} />
                                        </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                        type="text"
                                        name="uname"
                                        id="uname"
                                        {...formik.getFieldProps("uname")}
                                        invalid={!!(formik.touched.uname && formik.errors.uname)}
                                        >
                                        </Input>
                                    </InputGroup>
                                    <ErrorMessage
                                        name="uname"
                                        component="div"
                                        className="field-error text-danger"
                                    />
                                </FormGroup>
                                <FormGroup className="has-icon-left position-relative">
                                    <Label htmlFor="email">Email</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType='prepend'>
                                        <InputGroupText className={ !!(formik.touched.email && formik.errors.email) ? "border border-danger" : null}>
                                            <Mail size={15} />
                                        </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                        type="text"
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
                                    <Label htmlFor="phone">Phone</Label>
                                    <InputGroup>
                                        <InputGroupAddon addonType='prepend'>
                                        <InputGroupText className={ !!(formik.touched.phone && formik.errors.phone) ? "border border-danger" : null}>
                                            <Phone size={15} />
                                        </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                        type="number"
                                        name="phone"
                                        id="phone"
                                        {...formik.getFieldProps("phone")}
                                        invalid={!!(formik.touched.phone && formik.errors.phone)}
                                        >
                                        </Input>
                                    </InputGroup>
                                    <ErrorMessage
                                        name="phone"
                                        component="div"
                                        className="field-error text-danger"
                                    />
                                </FormGroup>
                                <FormGroup className="has-icon-left position-relative">
                                    <Label htmlFor="message">Message</Label>
                                    <InputGroup>
                                        <Input
                                        type="textarea"
                                        name="message"
                                        id="message"
                                        {...formik.getFieldProps("message")}
                                        invalid={!!(formik.touched.message && formik.errors.message)}
                                        >
                                        </Input>
                                    </InputGroup>
                                    <ErrorMessage
                                        name="message"
                                        component="div"
                                        className="field-error text-danger"
                                    />
                                </FormGroup>
                                <FormGroup className="">
                                    <Button color="primary" className="btn-sm" type="submit" ><Send size={16} /> Send</Button>
                                </FormGroup>
                            </Form>
                        }}
                    </Formik>
                    </div>
                </Col>
            </Row>
        </Grid>

        <Grid className="" item xs={12}>
            <h2 className="text-center">Locate Us</h2>
        </Grid>

        <Grid className="" item xs={12}>
            <Row className=''>
                <Col className='d-lg-flex align-items-center' lg='12' sm='12'>
                    <div>Map Will Come Here</div>
                {/* <iframe src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.104215945944!2d${landingPageData?.latitude ? landingPageData?.latitude : "17.5025379" }!3d${landingPageData?.longitude ? landingPageData?.longitude : "78.3950531" }!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb97abf6bcd773%3A0x7fe2002b8080c53f!2sAmoghnya%20Techsolution%20pvt.ltd!5e0!3m2!1sen!2sin!4v1636525927356!5m2!1sen!2sin`} width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe> */}
                </Col>
            </Row>
        </Grid>
    </Grid>
  )
}

export default ContactUs
