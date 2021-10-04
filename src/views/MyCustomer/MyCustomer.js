import React, {useState} from "react"
import {Card, CardHeader, CardTitle, Button, Row, Col, Badge} from "reactstrap"
import DataTable from "react-data-table-component"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {Edit, Trash} from "react-feather"

import CreateCustomerModal from "./Modal/CreateCustomerModal"
import DeleteModal from "./Modal/DeleteModal"

const MyCustomer = () => {

    const dispatch = useDispatch()
    // const customerData = useSelector(state => state.videos.videos)
    const customerData = [{name: "sample", email: "sample@gmail.com", phno: 9999999999, custType: "BAC", kycstatus: "DONE", accStatus: "Active"}]

  const [editModal, setModal] = useState(false)

  const toggleModel = () => {
    setModal((prevState) => !prevState)
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

  const [formUpdate, setAddFormUpdate] = useState(false)

  const tableColumns = [
    {
        name: "Name",
        selector: "name",
        sortable: true,
        cell: (row) => (
          <p className="text-bold-500 text-truncate mb-0">{row.name}</p>
        )
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      minWidth: "200px",
      cell: (row) => (
        <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
          <div className="user-info text-truncate ml-xl-50 ml-0">
            <span
              title={row.email}
              className="d-block text-bold-500 text-truncate mb-0"
            >
              {row.email}
            </span>
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
      name: "Customer Type",
      selector: "custType",
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 text-truncate mb-0">{row.custType}</p>
      )
    },
    {
      name: "KYC Status",
      selector: "kycstatus",
      sortable: true,
      cell: (row) => (
        <Badge color='primary'>
            {row.kycstatus}
        </Badge>
      )
    },
    {
      name: "Account Status",
      selector: "accStatus",
      sortable: true,
      cell: (row) => (
        <Badge color='primary'>
            {row.accStatus}
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
                    <Link to={{pathname: "/admin/edit-customer", params:{id}}}>
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
    // useEffect(() => {
    // dispatch(fetchAllVideos())
    // }, [confirmAlert, formUpdate, dispatch])

    //Deleting Data
    // const deleteid = defaultAlert.did
    // useEffect(() => {
    // if (confirmAlert) {
    // dispatch(deleteVideoById(deleteid))
    // }
    // }, [confirmAlert, deleteid, dispatch])

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
            <Card>
                <CardHeader className="d-flex justify-content-between">
                    <CardTitle>My Customer</CardTitle>
                    <Button type="button" color="primary" onClick={toggleModel}>Create Customer</Button>
                </CardHeader>
                <hr className="m-0" />
                <DataTable
                    className="dataTable-custom"
                    data={customerData}
                    columns={tableColumns}
                    noHeader
                    pagination
                    customStyles={customStyles}
                />
                {editModal ? (
                <CreateCustomerModal
                    modalState={editModal}
                    onClose={toggleModel}
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

export default MyCustomer