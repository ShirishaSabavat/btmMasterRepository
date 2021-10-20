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
          show={props.showModal}
        >
          <hr />
          <div className="d-flex my-2">
            <strong>Message</strong>: {props.data}
          </div>
        <Button type="button" color="success" onClick={() => props.setShowModal(prevState => !prevState)}>Ok</Button>
        </SweetAlert>
      </CardBody>
    </Card>
  )
}

export default ScheduleModal
