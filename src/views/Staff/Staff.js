import React, {useEffect} from "react"
import {Row, Col, Card, CardHeader, CardTitle, Button, Badge} from "reactstrap"
import DataTable from "react-data-table-component"
import {Link} from "react-router-dom"
import { Edit } from "react-feather"
import {useDispatch, useSelector} from "react-redux"
import CustomDataTable from '../../components/dataTable/CustomDataTable'

import { fetchAllStaff } from "../../redux/actions/staff/index"

const Staff = () => {

  const dispatch = useDispatch()
  const staffData = useSelector(state => state.staff.staff)

  useEffect(() => {
    dispatch(fetchAllStaff())
  }, [])

    const tableColumns = [
        {
            name: "Full Name",
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
            cell: (row) => (
              <p className="text-bold-500 mb-0">{row.email}</p>
            )
        },
        {
          name: "Phone",
          selector: "phone",
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500 mb-0">{row.phone}</p>
          )
        },
        {
          name: "Role",
          selector: "role",
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500 mb-0">{row.role}</p>
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
                        <Link to={{pathname: "/edit-staff", params:{id}}}>
                            <Edit size={15} />
                        </Link>
                        </Button>
                    </li>        
                </ul>
              </div>
            )
          }
        }
      ]

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

    // const staffData = [{fullName: "sample1", email:"124@123.com", phone: "9999999999", dob: "2-2-21", gender: "Male", role: "ADMIN", status: "ACTIVE" }]

    return <Row>
        <Col sm="12" md="12">
            <Card >
                <CardHeader>
                    <CardTitle>Staff</CardTitle>
                    <Link to="/add-staff" className="text-white"><Button color="primary" type="button">Add</Button></Link>
                </CardHeader>
                <hr className="m-0" />

                <CustomDataTable data={staffData} columns={tableColumns} />
                
            </Card>
        </Col>
    </Row>
}

export default Staff