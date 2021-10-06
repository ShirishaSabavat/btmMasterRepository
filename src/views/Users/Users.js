import React, {useState, useEffect} from "react"
import {Row, Col, Card, CardHeader, CardTitle, Button, Badge} from "reactstrap"
import DataTable from "react-data-table-component"
import {Trash, Eye} from "react-feather"
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"

import DeleteModal from "./Modals/DeleteModal"
import { fetchAllUsersData, deleteUser } from "../../redux/actions/user/index"

const UserTable = () => {

  const dispatch = useDispatch()

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
          name: "SNo",
          selector: "sno",
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500 text-truncate mb-0">{row.sno}</p>
          )
        },
        {
          name: "Name",
          selector: "name",
          sortable: true,
          cell: (row) => (
            <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
              <div className="user-info text-truncate ml-xl-50 ml-0">
                <p
                  title={row.name}
                  className="d-block text-bold-500 text-truncate mb-0"
                >
                  {row.name}
                </p>
              </div>
            </div>
          )
        },
        {
        name: "Phone No",
        selector: "phno",
        sortable: true,
        cell: (row) => (
            <p className="text-bold-500 text-truncate mb-0">{row.phno}</p>
        )
        },
        {
        name: "Email",
        selector: "email",
        sortable: true,
        cell: (row) => (
            <p className="text-bold-500 text-truncate mb-0">{row.email}</p>
        )
        },
        {
          name: "Date",
          selector: "date",
          sortable: true,
          height:"200px",
          cell: (row) => (
            <div className="d-flex flex-wrap">
              <p className="text-bold-500 text-wrap mb-0">{row.date}</p>
            </div>
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
                        <Link to={{pathname: "/view-user-data", params: {id}}}>
                            <Eye size={15} />
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
    dispatch(fetchAllUsersData())
  }, [confirmAlert])

   //Deleting Data
   const deleteid = defaultAlert.did
   useEffect(() => {
     if (confirmAlert) {
       dispatch(deleteUser(deleteid))
     }
   }, [confirmAlert, deleteid, dispatch])

    const usersData = [{sno: 1, name: "sample1", phno: "0099009900", email:"sample@sample.com", date: "2-2-2021", status: "ACTIVE" }]

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
                    <CardTitle>Users Data</CardTitle>
                </CardHeader>
                <hr className="m-0" />
                <DataTable
                    className="dataTable-custom"
                    data={usersData}
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

export default UserTable