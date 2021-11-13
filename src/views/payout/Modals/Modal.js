import React from "react"
import PropTypes from 'prop-types'
import {Row, Col, Card, CardHeader, CardTitle, CardBody, FormGroup, Label, Input, Button, InputGroup } from "reactstrap"
import {Button as MuiButton} from '@mui/material'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import {Formik, Form, ErrorMessage} from "formik"
import * as Yup from "yup"

const ScheduleModal = (props) => {

  const initialValues = {
    amount: props.selectedUser?.wallet,
    referanceId: "",
    remarks: ""
  }

  const validationSchema = Yup.object().shape({
      amount: Yup.string().required("Required"),
      referanceId: Yup.string().required("Required"),
      remarks: Yup.string()
  })

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2)
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1)
    }
  }))

  const releasePayout = (values, {resetForm}) => {
    console.log(values)
    console.log(props.selectedUser)

  }

  return (
      <BootstrapDialog
        onClose={() => props.setShowModal(prevState => !prevState)}
        aria-labelledby="customized-dialog-title"
        open={props.setShowModal}
      >
        <DialogContent style={{padding: 34}} dividers>
          <Typography gutterBottom>
            Payout 
          </Typography>

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={releasePayout} enableReinitialize>
            {(formik) => {
                return (
                    <Form >
                        <Row>
                            <Col sm="12">
                                <FormGroup className="has-icon-left position-relative">
                                    <Label htmlFor="amount">Amount <span className="text-danger">*</span></Label>
                                    <InputGroup>
                                        <Input
                                        type="text"
                                        name="amount"
                                        id="amount"
                                        {...formik.getFieldProps("amount")}
                                        invalid={!!(formik.touched.amount && formik.errors.amount)}
                                        >
                                        </Input>
                                    </InputGroup>
                                    <ErrorMessage
                                        name="amount"
                                        component="div"
                                        className="field-error text-danger"
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="12">
                                <FormGroup className="has-icon-left position-relative">
                                    <Label htmlFor="referanceId">Reference Id <span className="text-danger">*</span></Label>
                                    <InputGroup>
                                        <Input
                                        type="text"
                                        name="referanceId"
                                        id="referanceId"
                                        {...formik.getFieldProps("referanceId")}
                                        invalid={!!(formik.touched.referanceId && formik.errors.referanceId)}
                                        >
                                        </Input>
                                    </InputGroup>
                                    <ErrorMessage
                                        name="referanceId"
                                        component="div"
                                        className="field-error text-danger"
                                    />
                                </FormGroup>
                            </Col>
                            <Col sm="12">
                                <FormGroup className="has-icon-left position-relative">
                                    <Label htmlFor="remarks">Remarks </Label>
                                    <InputGroup>
                                        <Input
                                        type="textarea"
                                        name="remarks"
                                        id="remarks"
                                        {...formik.getFieldProps("remarks")}
                                        invalid={!!(formik.touched.remarks && formik.errors.remarks)}
                                        >
                                        </Input>
                                    </InputGroup>
                                    <ErrorMessage
                                        name="remarks"
                                        component="div"
                                        className="field-error text-danger"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>

                        <DialogActions >
                          <MuiButton color="error" autoFocus onClick={() => props.setShowModal(prevState => !prevState)}>
                            Cancel
                          </MuiButton>
                          <MuiButton type="submit">
                            Release
                          </MuiButton>
                        </DialogActions>
                      </Form>
                    )
              }}
          </Formik>

        </DialogContent>
        
      </BootstrapDialog>
  )
}

export default ScheduleModal
