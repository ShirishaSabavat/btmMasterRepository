import React, {useEffect, useState} from "react"
import {Card, CardHeader, CardTitle, CardBody, Button, Row, Col, Badge} from "reactstrap"
import DataTable from "react-data-table-component"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {Edit, Trash, Trash2, Clock, ArrowUpCircle, User, Users, CheckCircle} from "react-feather"
import CustomDataTable from '../../components/dataTable/CustomDataTable'
import { fetchAllBAcUsers } from '../../redux/actions/user'
import TableDataLoadingSkleton from '../../components/skleton/TableDataLoadingSkleton'

const Payout = () => {

  const dispatch = useDispatch()
  const users = useSelector(state => state.user.users)
  const loading = useSelector(state => state.common.loading)

  useEffect(() => {
    dispatch(fetchAllBAcUsers())
  }, [])

  const tableColumns = [
    // {
    //   name: "Date",
    //   selector: "date",
    //   sortable: true,
    //   cell: (row) => (
    //     <p className="text-bold-500 mb-0">{new Date(row.createdAt).toLocaleString()}</p>
    //   )
    // },
    {
        name: "Name",
        selector: "userName",
        sortable: true,
        cell: (row) => (
          <h4 className="text-bold-500 mb-0">{row.name}</h4>
        )
    },
    {
        name: "Rank",
        selector: "rank",
        sortable: true,
        cell: (row) => (
          <h6 style={{fontSize: 11}} className="mb-0">{row.rank}</h6>
        )
    },
    {
        name: "Balance",
        selector: "commision",
        sortable: true,
        cell: (row) => (
          <h4 className="text-bold-500 mb-0">₹ {row.wallet.toLocaleString('en-IN')}</h4>
        )
    },
    // {
    //   name: "Status",
    //   selector: "status",
    //   sortable: true,
    //   cell: (row) => (
    //     <Badge color={row.status === 'DONE' ? "success" : "warning"}>
    //         {row.status}
    //     </Badge>
    //   )
    // },
    {
      name: "Action",
      selector: "action",
      sortable: true,
      cell: (row) => (
        <Button className="btn btn-sm btn-danger">Payout</Button>
      )
    }
  ]
  

    // Fetching Data 
    // useEffect(() => {
    // dispatch(fetchAllVideos())
    // }, [confirmAlert, formUpdate, dispatch])

    if (loading) {
      return (
        <TableDataLoadingSkleton />
      )
    }


    return <Row>
        {/* <Col md="3" sm="12">
            <Card>
                <CardBody>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <h2 className='font-weight-bolder mb-0'>Completed</h2>
                            <p className='card-text'>₹ {[]?.reduce((p, c) => p + (c.commisionLevel === 1 ? c.commision : 0), 0).toLocaleString('en-IN')} ({[]?.filter(i => i.commisionLevel === 1).length.toLocaleString('en-IN')})</p>
                        </div>
                        <div className={`avatar avatar-stats p-50 m-0 bg-light-success`}>
                            <div className='avatar-content'><CheckCircle size={28} /></div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Col>

        <Col md="3" sm="12">
            <Card>
                <CardBody>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <h2 className='font-weight-bolder mb-0'>Pending</h2>
                            <p className='card-text'>₹ 0.00 (0)</p>
                        </div>
                        <div className={`avatar avatar-stats p-50 m-0 bg-light-warning`}>
                            <div className='avatar-content'><Clock size={28} /></div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Col> */}

        <Col sm="12" md="12">
            <Card>
                <CardHeader className="d-flex justify-content-between">
                    <CardTitle>Payouts</CardTitle>
                    {/* <Button type="button" color="primary" onClick={toggleModel}>Create Customer</Button> */}
                </CardHeader>
                <hr className="m-0" />
                
                <CustomDataTable slCheckBox={false} data={users} columns={tableColumns} />

            </Card>
        </Col>
    </Row>
}

export default Payout