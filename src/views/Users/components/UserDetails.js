import { Button, Label, Row, Col, Input, FormGroup } from 'reactstrap'
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"

import CustomSelectField from "../../UtilityComponents/CustomSelectField"

const UserDetails = (props) => {

  const initialValues = {
    name: props.userData?.name || "",
    email: props.userData?.email || "",
    phNo: props.userData?.phone || "",
    status: props.userData?.status || ""
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email().required("Required"),
    phNo: Yup.number().positive().integer().required("Required"),
    status: Yup.string()
  })


  const submitForm = values => {
    console.log("val", values)
  }

  const statusOptions = [{label:"ACTIVE", value:"ACTIVE"}, {label: "IN-ACTIVE", value: "IN-ACTIVE"}, {label: "BLOCK", value: "BLOCK"}]

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm} enableReinitialize>
        {(formik) => {
          return (
            <Form>
              <Row>
                <Col sm='6'>
                  <FormGroup>
                    <Label htmlFor='name'>Name</Label>
                        <Input
                        type="text"
                        name="name"
                        id="name"
                        {...formik.getFieldProps("name")}
                        invalid={!!(formik.touched.name && formik.errors.name)}
                        >
                        </Input>
                    <ErrorMessage
                        name="name"
                        component="div"
                        className="field-error text-danger"
                    />
                  </FormGroup>
                </Col>
                <Col sm='6'>
                  <FormGroup>
                    <Label htmlFor='email'>Email</Label>
                        <Input
                        type="text"
                        name="email"
                        id="email"
                        disabled={props.profile}
                        {...formik.getFieldProps("email")}
                        invalid={!!(formik.touched.email && formik.errors.email)}
                        >
                        </Input>
                    <ErrorMessage
                        name="email"
                        component="div"
                        className="field-error text-danger"
                    />
                  </FormGroup>
                </Col>
                <Col sm='6'>
                  <FormGroup>
                    <Label htmlFor='phNo'>Phone Number</Label>
                        <Input
                        type="number"
                        name="phNo"
                        id="phNo"
                        {...formik.getFieldProps("phNo")}
                        invalid={!!(formik.touched.phNo && formik.errors.phNo)}
                        >
                        </Input>
                    <ErrorMessage
                        name="phNo"
                        component="div"
                        className="field-error text-danger"
                    />
                  </FormGroup>
                </Col>
                {!props.profile && (
                <Col sm="12" md="6">
                    <FormGroup>
                        <Label htmlFor="status">Status</Label>
                        <CustomSelectField
                            value={formik.values.status}
                            options={statusOptions}
                            onChange={(value) => formik.setFieldValue("status", value.value)
                        } />
                        <ErrorMessage
                        name="status"
                        component="div"
                        className="field-error text-danger"
                        />
                    </FormGroup>
                </Col>
                )}
                <Col className='mt-2' sm='12'>
                  <Button.Ripple type='submit' className='mr-1' color='primary'>
                    Save
                  </Button.Ripple>
                </Col>
              </Row>
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export default UserDetails