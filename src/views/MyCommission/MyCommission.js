import React, {useEffect, useState} from "react"
import {Card, CardHeader, CardTitle, CardBody, Button, Row, Col, Badge} from "reactstrap"
import DataTable from "react-data-table-component"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {Edit, Trash, Trash2, Clock, ArrowUpCircle, User, Users} from "react-feather"
import CustomDataTable from '../../components/dataTable/CustomDataTable'
import { loadMyCommisions } from '../../redux/actions/user'
import TableDataLoadingSkleton from '../../components/skleton/TableDataLoadingSkleton'

const MyCommission = () => {

  const dispatch = useDispatch()
  const commisions = useSelector(state => state.user.commisions)
  const userData = useSelector(state => state.auth.userData)
  const loading = useSelector(state => state.common.loading)

  useEffect(() => {
    dispatch(loadMyCommisions())
  }, [])

  const tableColumns = [
    {
      name: "Date",
      selector: "date",
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 mb-0">{new Date(row.createdAt).toLocaleString('en-GB', { timeZone: 'UTC', hour12: true })}</p>
      )
    },
    {
        name: "Name",
        selector: "userName",
        sortable: true,
        cell: (row) => (
          <h4 className="text-bold-500 mb-0">{row.parentId?.name}</h4>
        )
    },
    {
        name: "Referral",
        selector: "referral",
        sortable: true,
        cell: (row) => (
          <h6 style={{fontSize: 11}} className="mb-0">{row.referral}</h6>
        )
    },
    {
        name: "Commision",
        selector: "commision",
        sortable: true,
        cell: (row) => (
          <h4 className="text-bold-500 mb-0">₹ {row.commision.toLocaleString('en-IN')}</h4>
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
      name: "Level",
      selector: "level",
      sortable: true,
      cell: (row) => (
        <Badge color={row.commisionLevel === 1 ? "light-primary" : row.commisionLevel === 1 ? "light-info" : "light-danger"} pill>
          <span className="px-1">{row.commisionLevel === 1 ? "D" : (row.commisionLevel - 1) }</span>
        </Badge>
      )
    },
    {
      name: "Remark",
      selector: "remark",
      sortable: true,
      width: '250px',
      cell: (row) => (
        <p style={{fontSize: 10}} className="p-1 mb-0">{row.remarks}</p>
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
  
  if (loading) {
    return (
      <TableDataLoadingSkleton />
    )
  }


    return <Row>
        <Col md="3" sm="12">
            <Card>
                <CardBody>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <h2 className='font-weight-bolder mb-0'>Direct</h2>
                            <p className='card-text'>₹ {commisions?.reduce((p, c) => p + (c.commisionLevel === 1 ? c.commision : 0), 0).toLocaleString('en-IN')} ({commisions?.filter(i => i.commisionLevel === 1).length.toLocaleString('en-IN')})</p>
                        </div>
                        <div className={`avatar avatar-stats p-50 m-0 bg-light-success`}>
                            <div className='avatar-content'><User size={28} /></div>
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
                            <h2 className='font-weight-bolder mb-0'>Indirect</h2>
                            <p className='card-text'>₹ {commisions?.reduce((p, c) => p + (c.commisionLevel > 1 ? c.commision : 0), 0).toLocaleString('en-IN')} ({commisions?.filter(i => i.commisionLevel > 1).length.toLocaleString('en-IN')})</p>
                        </div>
                        <div className={`avatar avatar-stats p-50 m-0 bg-light-danger`}>
                            <div className='avatar-content'><Users size={28} /></div>
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
                            <h2 className='font-weight-bolder mb-0'>Hold</h2>
                            <p className='card-text'>₹ 0.00 (0)</p>
                        </div>
                        <div className={`avatar avatar-stats p-50 m-0 bg-light-warning`}>
                            <div className='avatar-content'><Clock size={28} /></div>
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
                            <h2 className='font-weight-bolder mb-0'>Expired</h2>
                            <p className='card-text'>₹ 0.00 (0)</p>
                        </div>
                        <div className={`avatar avatar-stats p-50 m-0 bg-light-danger`}>
                            <div className='avatar-content'><Trash2 size={28} /></div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Col>

        <Col sm="12" md="12">
            <Card>
                <CardHeader className="d-flex justify-content-between">
                    <CardTitle>My Commisions</CardTitle>
                    {/* <Button type="button" color="primary" onClick={toggleModel}>Create Customer</Button> */}
                </CardHeader>
                <hr className="m-0" />
                
                <CustomDataTable slCheckBox={false} data={commisions} columns={(userData.user.role !== 'ADMIN') ? tableColumns.filter(i => (i.selector !== 'userName' && i.selector !== 'referral')) : tableColumns} />

            </Card>
        </Col>
    </Row>
}

export default MyCommission