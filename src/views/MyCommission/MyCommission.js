import React, {useEffect, useState} from "react"
import {Card, CardHeader, CardTitle, Button, Row, Col, Badge} from "reactstrap"
import DataTable from "react-data-table-component"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {Edit, Trash} from "react-feather"
import CustomDataTable from '../../components/dataTable/CustomDataTable'
import { loadMyCommisions } from '../../redux/actions/user'

const MyCommission = () => {

  const dispatch = useDispatch()
  const commisions = useSelector(state => state.user.commisions)
  const userData = useSelector(state => state.auth.userData)

  useEffect(() => {
    dispatch(loadMyCommisions())
  }, [])

  const tableColumns = [
    {
        name: "User Name",
        selector: "userName",
        sortable: true,
        cell: (row) => (
          <h4 className="text-bold-500 mb-0">{row.userId?.name}</h4>
        )
    },
    {
        name: "Commision",
        selector: "commision",
        sortable: true,
        cell: (row) => (
          <h4 className="text-bold-500 mb-0">₹ {row.commision}</h4>
        )
    },
    {
      name: "Percentage",
      selector: "commisionPercentage",
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 mb-0">{row.commisionPercentage} %</p>
      )
    },
    {
      name: "Date",
      selector: "date",
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 mb-0">{new Date(row.createdAt).toLocaleString()}</p>
      )
    },
    {
      name: "Remark",
      selector: "remark",
      sortable: true,
      cell: (row) => (
        <p className="mb-0">{row.remarks}</p>
      )
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
      cell: (row) => (
        <Badge color={row.status === 'DONE' ? "success" : "warning"}>
            {row.status}
        </Badge>
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
                    <CardTitle>My Commisions</CardTitle>
                    {/* <Button type="button" color="primary" onClick={toggleModel}>Create Customer</Button> */}
                </CardHeader>
                <hr className="m-0" />
                
                <CustomDataTable slCheckBox={false} data={commisions} columns={(userData.user.role !== 'ADMIN') ? tableColumns.filter(i => i.selector !== 'userName') : tableColumns} />

            </Card>
        </Col>
    </Row>
}

export default MyCommission