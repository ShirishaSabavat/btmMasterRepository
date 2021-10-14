import React, {useState, useEffect} from "react"
import {Row, Col, Card, CardHeader, CardTitle, Button, Badge} from "reactstrap"
import DataTable from "react-data-table-component"
import {Trash, Eye} from "react-feather"
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import { DataGrid } from '@mui/x-data-grid'

import DeleteModal from "./Modals/DeleteModal"
import { fetchAllUsersData, deleteUser } from "../../redux/actions/user/index"

const UserTable = () => {

  const dispatch = useDispatch()
  const usersData = useSelector(state => state.user.users)

  const [defaultAlert, setDefaultAlert] = useState({
    alert: false,
    did: ""
  })
  const [confirmAlert, setConfirmAlert] = useState(false)
  const [cancelAlert, setCancelAlert] = useState(false)
  const [rows, setRows] = useState([])

  const defaultAlertHandler = (value) => {
    setDefaultAlert({ alert: value.alert, did: value.did })
  }
  const confirmAlertHandler = (value) => {
    setConfirmAlert(value)
  }
  const cancelAlertHandler = (value) => {
    setCancelAlert(value)
  }

  useEffect(() => {
    setRows(usersData.map((values) => { return {id: values.sno, col1: values.sno, col2: values.name, col3: values.role, col4: values.phone, col5: values.email, col6: values.date, col7: values.status } }))
  }, [usersData])


  const columns = [
    { field: 'col1', headerName: 'SNo', width: 150 },
    { field: 'col2', headerName: 'Name', width: 150 },
    { field: 'col3', headerName: 'Role', width: 150 },
    { field: 'col4', headerName: 'Phone', width: 150 },
    { field: 'col5', headerName: 'Email', width: 150 },
    { field: 'col6', headerName: 'Date', width: 150 },
    { field: 'col7', headerName: 'Status', width: 150},
    { field: 'col8', headerName: 'Mode', width: 100 }
  ]
  

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
                <p
                  className="d-block text-bold-500 text-truncate mb-0"
                >
                  {row.name}
                </p>
          )
        },
        {
          name: "Role",
          selector: "role",
          sortable: true,
          cell: (row) => (
                <p
                  className="text-bold-500 text-truncate mb-0"
                >
                  {row.role}
                </p>
          )
        },
        {
        name: "Phone No",
        selector: "phone",
        sortable: true,
        cell: (row) => (
            <p className="text-bold-500 text-truncate mb-0">{row.phone}</p>
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

  console.log("rows", rows)

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
                <hr />
                <div style={{ height: 300, width: '99%', margin: "auto" }}>

                {/* <DataGrid
                  rows={rows} 
                  columns={columns}
                  filterModel={{
                    items: [{ columnField: 'Name', operatorValue: 'contains', value: 'rice' }]
                  }}
                
                /> */}
                </div>
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