import React, {useState, useEffect} from "react"
import {Row, Col, Button, FormGroup, Label, Input, InputGroup, Card, CardBody, CustomInput} from 'reactstrap'
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"
import { Country, State, City }  from 'country-state-city'

import CustomSelectField from "../../UtilityComponents/CustomSelectField"

const AddressComponent  = () => {
   
  const allCountries = Country.getAllCountries().map(values => { return {label : values.name, value : values.isoCode } })

  const [countryOptions] = useState(allCountries)
  const [stateOptions, setStates] = useState([])
  const [cityOptions, setCityOptions] = useState()

  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedState, setSelectedState] = useState("")

  useEffect(() => {
    setStates(State.getStatesOfCountry(selectedCountry).map(values => { return {label : values.name, value : values.isoCode, countryCode: values.countryCode } }))
  }, [selectedCountry])

  useEffect(() => {
    const CountryCode = selectedState?.countryCode 
    const StateCode = selectedState?.value
    setCityOptions(City.getCitiesOfState(CountryCode, StateCode).map(values => { return {label : values.name, value: values.stateCode } }))
  }, [selectedState])

    const initialValues = {
        address1:"",
        address2:"",
        country:"",
        state:"",
        city:"",
        zipCode:"",
        addressAttachment:""
    }

    const validationSchema = Yup.object().shape({
        address1: Yup.string().required("Required"),
        address2: Yup.string().required("Required"),
        country: Yup.string().required("Required"),
        state: Yup.string().required("Required"),
        city: Yup.string().required("Required"),
        zipCode: Yup.number().positive().integer().required("Required"),
        addressAttachment: Yup.string().required("Required")

    })

    const submitForm = (values) => {
        console.log("values", values)
    }

    const countryChangeHadler = (value, formik) => {
        formik.setFieldValue("country", value.label)
        setSelectedCountry(value.value)
      }
    
      const StateChangeHadler = (value, formik) => {
        console.log("val", value)
        formik.setFieldValue("state", value.label)
        setSelectedState(value)
      }

    return <Row>
        <Col sm="12" md="6">
            <Card>
                <CardBody>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm}>
                {(formik) => {
                    return (<Form>
                        <FormGroup className="has-icon-left position-relative">
                            <Label for="address1">Address1</Label>
                            <InputGroup>
                                <Input
                                type="textarea"
                                name="address1"
                                id="address1"
                                {...formik.getFieldProps("address1")}
                                invalid={!!(formik.touched.address1 && formik.errors.address1)}
                                >
                                </Input>
                            </InputGroup>
                            <ErrorMessage
                                name="address1"
                                component="div"
                                className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup className="has-icon-left position-relative">
                            <Label for="address2">Address2</Label>
                            <InputGroup>
                                <Input
                                type="textarea"
                                name="address2"
                                id="address2"
                                {...formik.getFieldProps("address2")}
                                invalid={!!(formik.touched.address2 && formik.errors.address2)}
                                >
                                </Input>
                            </InputGroup>
                            <ErrorMessage
                                name="address2"
                                component="div"
                                className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label For="country">Country</Label>
                            <CustomSelectField
                              value={formik.values.country}
                              options={countryOptions}
                              onChange={(value) => countryChangeHadler(value, formik)}
                            />
                            <ErrorMessage
                            name="country"
                            component="div"
                            className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label For="state">State</Label>
                            <CustomSelectField
                              value={formik.values.state}
                              options={stateOptions}
                              onChange={(value) => StateChangeHadler(value, formik) }
                            />
                            <ErrorMessage
                            name="state"
                            component="div"
                            className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label For="city">City</Label>
                            <CustomSelectField
                              value={formik.values.city}
                              options={cityOptions}
                              onChange={(value) => formik.setFieldValue("city", value.label)}
                            />
                            <ErrorMessage
                            name="city"
                            component="div"
                            className="field-error text-danger"
                            />
                        </FormGroup> <FormGroup className="has-icon-left position-relative">
                            <Label for="zipCode">Zip Code</Label>
                            <InputGroup>
                                <Input
                                type="number"
                                name="zipCode"
                                id="zipCode"
                                {...formik.getFieldProps("zipCode")}
                                invalid={!!(formik.touched.zipCode && formik.errors.zipCode)}
                                >
                                </Input>
                            </InputGroup>
                            <ErrorMessage
                                name="zipCode"
                                component="div"
                                className="field-error text-danger"
                            />
                        </FormGroup>
                        <FormGroup className="has-icon-left position-relative">
                            <Label for="addressAttachment">Address Documnet</Label>
                            <CustomInput
                            type="file"
                            name="addressAttachment"
                            id="addressAttachment"
                            {...formik.getFieldProps("addressAttachment")}
                            invalid={!!(formik.touched.addressAttachment && formik.errors.addressAttachment)}
                            >
                            </CustomInput>
                            <ErrorMessage
                                name="addressAttachment"
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

export default AddressComponent