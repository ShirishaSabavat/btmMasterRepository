import React, {useState, useEffect} from "react"
import {Row, Col, Card, CardHeader, CardTitle, Button, Badge} from "reactstrap"
import DataTable from "react-data-table-component"
import {Link} from "react-router-dom"
import {Edit, Trash} from "react-feather"
import {useDispatch, useSelector} from "react-redux"


import { BASE_URL } from "../../../utility/serverSettings"
import DeleteModal from "./Modals/DeleteModal"
import {fetchAllFaculty} from "../../../redux/actions/faculty/index"

const Videos = () => {

  const dispatch = useDispatch()
  const facultyData = useSelector(state => state.faculty.faculty)

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
          name: "Faculty Name",
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
          name: "Faculty Image",
          selector: "image",
          sortable: true,
          cell: (row) => (
            <img style={{marginTop: "5px", marginBottom: "5px"}} src={(row.image === '/assets/images/default-image.jpg') ? row.image : `${BASE_URL}uploads/${row.image}`} width="58px" height="58px" alt="image" />
          )
        },
        {
          name: "Status",
          selector: "status",
          sortable: true,
          cell: (row) => (
            <Badge color='primary'>
             {row.status}
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
                        <Link to={{pathname: "/edit-faculty", params:{id}}}>
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
    dispatch(fetchAllFaculty())
  }, [])

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
                    <CardTitle>Faculties</CardTitle>
                    <Link to="/add-faculty" className="text-white"><Button color="primary" type="button">Add</Button></Link>
                </CardHeader>
                <hr className="m-0" />
                <DataTable
                    className="dataTable-custom"
                    data={facultyData}
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

export default Videos