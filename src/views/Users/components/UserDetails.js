import { Button, Label, Row, Col, Input, FormGroup } from 'reactstrap'
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"

const UserDetails = ({userData}) => {

  const initialValues = {
    name: userData?.name || "",
    email: userData?.email || "",
    phNo: userData?.phone || ""
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email().required("Required"),
    phNo: Yup.number().positive().integer().required("Required")
  })


  const submitForm = values => {
    console.log("val", values)
  }

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitForm} enableReinitialize>
        {(formik) => {
          return (
            <Form>
              <Row>
                <Col sm='6'>
                  <FormGroup>
                    <Label for='name'>Name</Label>
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
                    <Label for='email'>Email</Label>
                        <Input
                        type="text"
                        name="email"
                        id="email"
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
                    <Label for='phNo'>Phone Number</Label>
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
                <Col className='mt-2 d-flex justify-content-end' sm='12'>
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