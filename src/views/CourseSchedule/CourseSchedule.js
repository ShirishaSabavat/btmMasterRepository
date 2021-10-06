import React, {useState, useEffect} from "react"
import {Row, Col, Card, CardHeader, CardTitle, Button, Badge} from "reactstrap"
import DataTable from "react-data-table-component"
import {Link} from "react-router-dom"
import {Edit, Trash, Eye} from "react-feather"
import {useDispatch, useSelector} from "react-redux"

import DeleteModal from "./Modals/DeleteModal"
import {fetchAllCourseSchedules, deleteCourseSchedule} from "../../redux/actions/courseSchedule/index"

const CourseSchedule = () => {

  const dispatch = useDispatch()
  const workshopData = useSelector(state => state.courseSchedule.courseSchedules) 

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
          name: "Batch No",
          selector: "batchNo",
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500 text-truncate mb-0">{row.batchNo}</p>
          )
        },
        {
          name: "Course Name",
          selector: "courseName",
          sortable: true,
          cell: (row) => (
            <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
              <div className="user-info text-truncate ml-xl-50 ml-0">
                <p
                  title={row.courseId}
                  className="d-block text-bold-500 text-truncate mb-0"
                >
                  {row.courseId}
                </p>
              </div>
            </div>
          )
        },
        {
          name: "Date",
          selector: "date",
          sortable: true,
          height:"200px",
          cell: (row) => (
            <div className="d-flex flex-wrap">
              <p className="text-bold-500 text-wrap mb-0">From: {row.startDate}</p>
              <p className="text-bold-500 mb-0">To: {row.endDate}</p>
            </div>
          )
        },
        {
          name: "Location",
          selector: "location",
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500 text-truncate mb-0">{row.location}</p>
          )
        },
        {
          name: "Faculty",
          selector: "faculty",
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500 text-truncate mb-0">{row.faculty}</p>
          )
        },
        {
          name: "Status",
          selector: "status",
          sortable: true,
          cell: (row) => (
            <Badge color={row.status === "ACTIVE" ? "success" : "danger"} pill>
                <span>{row.status.toUpperCase()}</span>
            </Badge>
          )
        },
        {
          name: "Actions",
          selector: "",
          sortable: true,
          cell: (row) => {
            const id = row._id
            return (
              <div className="d-flex flex-column align-items-center">
                <ul className="list-inline mb-0">     
                    <li className="list-inline-item">
                        <Button
                        className="btn-icon rounded-circle"
                        color="flat-warning"
                        >
                        <Link to={{pathname: "/view-course-schedule", params: {id}}}>
                            <Eye size={15} />
                        </Link>
                        </Button>
                    </li>
                    <li className="list-inline-item">
                        <Button
                        className="btn-icon rounded-circle"
                        color="flat-warning"
                        >
                        <Link to={{pathname: "/edit-course-schedule", params: {id}}}>
                            <Edit size={15} />
                        </Link>
                        </Button>
                    </li>
                    <li className="list-inline-item">
                        <Button
                        className="btn-icon rounded-circle"
                        color="flat-danger"
                        onClick={() => defaultAlertHandler({ alert: true, did: id })}
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

      
  // Fetching Data 
  useEffect(() => {
    dispatch(fetchAllCourseSchedules())
  }, [confirmAlert])

   //Deleting Data
   const deleteid = defaultAlert.did
   useEffect(() => {
     if (confirmAlert) {
       dispatch(deleteCourseSchedule(deleteid))
     }
   }, [confirmAlert, deleteid, dispatch])

    // const workshopData = [{_id: "123", batchNo: 1, courseName: "sample1", startdate: "2-2-2021", enddate:"4-4-2021", location: "HYD", faculty: "sir 1", status: "ACTIVE" }]

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
                    <CardTitle>Course Schedule</CardTitle>
                    <Button color="primary" type="button"><Link to="/add-course-schedule" className="text-white">Add</Link></Button>
                </CardHeader>
                <hr className="m-0" />
                <DataTable
                    className="dataTable-custom"
                    data={workshopData}
                    columns={tableColumns}
                    noHeader
                    pagination
                    customStyles={customStyles}
                />
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

export default CourseSchedule