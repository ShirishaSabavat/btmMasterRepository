import React, {useEffect, useState} from "react"
import {Card, CardHeader, CardTitle, Button, Row, Col, Badge} from "reactstrap"
import DataTable from "react-data-table-component"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {Edit, Trash} from "react-feather"
import CustomDataTable from '../../components/dataTable/CustomDataTable'
import { loadMyClients } from '../../redux/actions/user'

  const MyCustomer = () => {

  const dispatch = useDispatch()
  const users = useSelector(state => state.user.users)

  useEffect(() => {
    dispatch(loadMyClients())
  }, [])

  const tableColumns = [
    {
        name: "Name",
        selector: "name",
        sortable: true,
        cell: (row) => (
          <p className="text-bold-500 mb-0">{row.name}</p>
        )
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      minWidth: "200px",
      cell: (row) => (
        <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
          <div className="user-info ml-xl-50 ml-0">
            <span
              title={row.email}
              className="d-block text-bold-500 mb-0"
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
        <p className="text-bold-500 mb-0">{row.phone}</p>
      )
    },
    {
      name: "Customer Type",
      selector: "custType",
      sortable: true,
      cell: (row) => (
        <Badge color={row.role === 'USER' ? "primary" : "info"}>
          {row.role ? row.role.replace('_USER', '') : ''}
        </Badge>
      )
    },
    {
      name: "Referral",
      selector: "referral",
      sortable: true,
      cell: (row) => (
          <p>{row.referral}</p>
      )
    },
    {
      name: "KYC Status",
      selector: "kycstatus",
      sortable: true,
      cell: (row) => (
        <>
          {row.role === 'BAC_USER' && (
            <Badge color={row.kycStatus === 'VERIFIED' ? "success" : "warning"}>
                {row.kycStatus}
            </Badge>
          )}
        </>
      )
    },
    {
      name: "Account Status",
      selector: "accStatus",
      sortable: true,
      cell: (row) => (
        <Badge color={row.status === 'ACTIVE' ? "success" : "danger"}>
            {row.status}
        </Badge>
      )
    },
    {
      name: "Date",
      selector: "phno",
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 mb-0">{new Date(row.createdAt).toLocaleString('en-GB', { timeZone: 'UTC', hour12: true })}</p>
      )
    }
  ]

    // Fetching Data 
    // useEffect(() => {
    // dispatch(fetchAllVideos())
    // }, [confirmAlert, formUpdate, dispatch])


    return <Row>
        <Col sm="12" md="12">
            <Card>
                <CardHeader className="d-flex justify-content-between">
                    <CardTitle>My Direct Customer</CardTitle>
                    {/* <Button type="button" color="primary" onClick={toggleModel}>Create Customer</Button> */}
                </CardHeader>
                <hr className="m-0" />
                
                <CustomDataTable slCheckBox={false} data={users.filter(i => i.myRootParent === undefined)} columns={tableColumns} />

            </Card>
        </Col>

        <Col sm="12" md="12">
            <Card>
                <CardHeader className="d-flex justify-content-between">
                    <CardTitle>My Indirect Customer</CardTitle>
                    {/* <Button type="button" color="primary" onClick={toggleModel}>Create Customer</Button> */}
                </CardHeader>
                <hr className="m-0" />
                
                <CustomDataTable slCheckBox={false} data={users.filter(i => i.myRootParent !== undefined)} columns={tableColumns} />

            </Card>
        </Col>
    </Row>
}

export default MyCustomer