import React from "react"
import { Card, CardBody } from "reactstrap"
import SweetAlert from "react-bootstrap-sweetalert"
import Button from "reactstrap/lib/Button"


const ScheduleModal = (props) => {
  return (
    <Card>
      <CardBody>
        <SweetAlert
          showConfirm={false}
          title={props.formTitle}
          show={props.modalState}
        >
        <Button type="button" color="danger" onClick={props.onClose}>Close</Button>
        </SweetAlert>
      </CardBody>
    </Card>
  )
}

export default ScheduleModal
