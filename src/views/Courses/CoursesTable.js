import React, {useState, useEffect} from "react"
import {Row, Col, Card, CardHeader, CardTitle, Button} from "reactstrap"
import DataTable from "react-data-table-component"
import {Link} from "react-router-dom"
import {Calendar, Edit, Trash, Eye} from "react-feather"
import { useDispatch, useSelector } from "react-redux"

import DeleteModal from "./Modals/DeleteModal"
import {fetchAllCourses, deleteCourseById} from "../../redux/actions/courses/index"

const CourseTable = () => {

  const dispatch = useDispatch()
  const courseData = useSelector(state => state.courses.courses)

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
          name: "Course Name",
          selector: "name",
          sortable: true,
          minWidth: "200px",
          cell: (row) => (
            <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
              <div className="user-info text-truncate ml-xl-50 ml-0">
                <span
                  title={row.name}
                  className="d-block text-bold-500 text-truncate mb-0"
                >
                  {row.name}
                </span>
              </div>
            </div>
          )
        },
        {
          name: "Code",
          selector: "code",
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500 text-truncate mb-0">{row.code}</p>
          )
        },
        {
          name: "Type",
          selector: "type",
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500 text-truncate mb-0">{row.type}</p>
          )
        },
        {
          name: "Price",
          selector: "price",
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500 text-truncate mb-0">₹ {row.price}</p>
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
                        color="flat-info"
                        >
                          <Link to="/schedule-table">
                            <Eye size={15} />
                          </Link>
                        </Button>
                    </li>            
                    <li className="list-inline-item">
                        <Button
                        className="btn-icon rounded-circle"
                        color="flat-warning"
                        >
                        <Link to={{pathname: "/edit-course", params:{id}}}>
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
    dispatch(fetchAllCourses())
  }, [confirmAlert, dispatch])

  //Deleting Data
  const deleteid = defaultAlert.did
  useEffect(() => {
    if (confirmAlert) {
      dispatch(deleteCourseById(deleteid))
    }
  }, [confirmAlert, deleteid, dispatch])

    // const courseData = [{courseName: "course1", code: "123", type: "BCA", price: 1000 }]

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
                    <CardTitle>Courses</CardTitle>
                    <Link to="/add-course" className="text-white"><Button color="primary" type="button">Add</Button></Link>
                </CardHeader>
                <hr className="m-0" />
                <DataTable
                    className="dataTable-custom"
                    data={courseData}
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

export default CourseTable