import React, {useState} from "react"
import {Row, Col, Card, CardHeader, CardTitle, Button, Badge} from "reactstrap"
import DataTable from "react-data-table-component"
import {Link} from "react-router-dom"
import {Edit, Trash} from "react-feather"
import ScheduleModal from "./Modals/Modal"
import DeleteModal from "./Modals/DeleteModal"

const Videos = () => {

  const [setAddFormUpdate] = useState(false)

  const [editModal, setModal] = useState({
    modal: false,
    modalData: {
      id: "",
      name: "",
      status: "",
      createdBy: ""
    }
  })

  
  const toggleModel = (modalData) => {
    setModal((prevState) => {
      return { modal: !prevState.modal, modalData }
    })
  }

  const [defaultAlert, setDefaultAlert] = useState({
    alert: false,
    did: ""
  })
  const [confirmAlert, setConfirmAlert] = useState(false)
  const [cancelAlert, setCancelAlert] = useState(false)

  const defaultAlertHandler = (value) => {
    setDefaultAlert({ alert: value.alert, did: value.did })
  }
  const confirmAlertHandler = (value) => {
    setConfirmAlert(value)
  }
  const cancelAlertHandler = (value) => {
    setCancelAlert(value)
  }

    const tableColumns = [
        {
            name: "Video Id",
            selector: "id",
            sortable: true,
            cell: (row) => (
              <p className="text-bold-500 text-truncate mb-0">{row.id}</p>
            )
        },
        {
          name: "Video Name",
          selector: "videoName",
          sortable: true,
          minWidth: "200px",
          cell: (row) => (
            <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
              <div className="user-info text-truncate ml-xl-50 ml-0">
                <span
                  title={row.videoName}
                  className="d-block text-bold-500 text-truncate mb-0"
                >
                  {row.videoName}
                </span>
              </div>
            </div>
          )
        },
        {
          name: "Image",
          selector: "image",
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500 text-truncate mb-0">{row.image}</p>
          )
        },
        {
          name: "Video Link",
          selector: "videoLink",
          sortable: true,
          cell: (row) => (
            <Badge color='primary'>
              <Link className="text-white" to={`${row.videoLink}`}>Click Here</Link>
            </Badge>
          )
        },
        {
          name: "Duration",
          selector: "duration",
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500 text-truncate mb-0">{row.duration}</p>
          )
        },
        {
          name: "Actions",
          selector: "",
          sortable: true,
          cell: (row) => {
            return (
              <div className="d-flex flex-column align-items-center">
                <ul className="list-inline mb-0">
                    <li className="list-inline-item">
                        <Button
                        className="btn-icon rounded-circle"
                        color="flat-warning"
                        >
                        <Link to={{pathname: "/edit-video"}}>
                            <Edit size={15} />
                        </Link>
                        </Button>
                    </li>
                    <li className="list-inline-item">
                        <Button
                        className="btn-icon rounded-circle"
                        color="flat-danger"
                        onClick={() => defaultAlertHandler({ alert: true })}
                        >
                            <Trash size={15} />
                        </Button>
                    </li>            
                </ul>
              </div>
            )
          }
        }
      ]

    const videosData = [{id: "123", videoName: "spritual 1", image: "BCA", videoLink: "htpps://", duration: "1hr" }]

    const customStyles = {
        headCells: {
          style: {
            fontSize: "15px",
            fontWeight: "bolder"
          }
        },
        rows: {
          style: {
            "&:hover": {
              backgroundColor: "#eee"
            },
            cursor: "pointer"
          }
        }
      }

    return <Row>
        <Col sm="12" md="12">
            <Card >
                <CardHeader>
                    <CardTitle>Course Videos</CardTitle>
                    <Button color="primary" type="button"><Link to="/add-video" className="text-white">Add</Link></Button>
                </CardHeader>
                <hr className="m-0" />
                <DataTable
                    className="dataTable-custom"
                    data={videosData}
                    columns={tableColumns}
                    noHeader
                    pagination
                    customStyles={customStyles}
                />
                 {editModal.modal ? (
                    <ScheduleModal
                      modalState={editModal.modal}
                      modalData={editModal.modalData}
                      onClose={toggleModel}
                      formTitle="Videos"
                      setAddFormUpdate={setAddFormUpdate}
                    />
                  ) : null}
                 {defaultAlert.alert ? (
                  <DeleteModal
                    defaultAlertHandler={defaultAlertHandler}
                    confirmAlertHandler={confirmAlertHandler}
                    cancelAlertHandler={cancelAlertHandler}
                    defaultAlert={defaultAlert.alert}
                    confirmAlert={confirmAlert}
                    cancelAlert={cancelAlert}
                  />
                ) : null}
            </Card>
        </Col>
    </Row>
}

export default Videos