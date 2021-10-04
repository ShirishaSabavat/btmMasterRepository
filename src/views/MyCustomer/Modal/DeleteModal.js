import React from "react"
import SweetAlert from "react-bootstrap-sweetalert"

const DeleteModal = (props) => {
  return (
    <div>
      <SweetAlert
        title="Are you sure?"
        warning
        show={props.defaultAlert}
        showCancel
        reverseButtons
        cancelBtnBsStyle="danger"
        confirmBtnText="Yes, delete it!"
        cancelBtnText="Cancel"
        onConfirm={() => {
          props.confirmAlertHandler(true)
        }}
        onCancel={() => {
          props.cancelAlertHandler(true)
        }}
      >
        You won't be able to revert this!
      </SweetAlert>

      <SweetAlert
        success
        title="Deleted!"
        confirmBtnBsStyle="success"
        show={props.confirmAlert}
        onConfirm={() => {
          props.defaultAlertHandler(false)
          props.confirmAlertHandler(false)
        }}
      >
        <p className="sweet-alert-text">Your file has been deleted.</p>
      </SweetAlert>

      <SweetAlert
        error
        title="Cancelled"
        confirmBtnBsStyle="success"
        show={props.cancelAlert}
        onConfirm={() => {
          props.defaultAlertHandler(false)
          props.cancelAlertHandler(false)
        }}
      >
        <p className="sweet-alert-text">Your imaginary file is safe :)</p>
      </SweetAlert>
    </div>
  )
}

export default DeleteModal
