import React, {useEffect, useState} from "react"
import {Card, CardHeader, CardTitle, Button, CardBody, Row, Col, Badge} from "reactstrap"
import DataTable from "react-data-table-component"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {Edit, ArrowUpCircle, AlertOctagon, CheckCircle} from "react-feather"
import CustomDataTable from '../../components/dataTable/CustomDataTable'
import { loadMyTransactions } from '../../redux/actions/user'

const Wallet = () => {

  const dispatch = useDispatch()
  const transactions = useSelector(state => state.user.transactions)
  const userData = useSelector(state => state.auth.userData)
  

  useEffect(() => {
    dispatch(loadMyTransactions())
  }, [])

  const tableColumns = [
    {
        name: "User Name",
        selector: "userName",
        sortable: true,
        cell: (row) => (
          <p className="text-bold-500 mb-0">{row.userId?.name}</p>
        )
    },
    {
        name: "Amount",
        selector: "amount",
        sortable: true,
        cell: (row) => (
          <h4 className={`text-bold-500 mb-0 ${row.type === 'CREDIT' ? 'text-success' : ''}`}> {row.type === 'CREDIT' ? "+" : "-"} ₹ {row.amount}</h4>
        )
    },
    {
      name: "Percentage",
      selector: "commisionPercentage",
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 mb-0">
            <small>{`Opening Balance: ₹ ${row.openingBalance}`}</small>
            <small>{`Closing Balance: ₹ ${row.closingBalance}`}</small>
        </p>
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
      name: "Status",
      selector: "status",
      sortable: true,
      cell: (row) => (
        <Badge color={row.type === 'CREDIT' ? "warning" : "success"}>
            {row.status}
        </Badge>
      )
    },
    {
        name: "Remark",
        selector: "remark",
        sortable: true,
        cell: (row) => (
          <p className="mb-0">{row.remarks}</p>
        )
    }
  ]

    // Fetching Data 
    // useEffect(() => {
    // dispatch(fetchAllVideos())
    // }, [confirmAlert, formUpdate, dispatch])


    return (
    <Row>
        <Col md="3" sm="12">
            <Card>
                <CardBody>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            <h2 className='font-weight-bolder mb-0'>Credits</h2>
                            <p className='card-text'>₹ {transactions.reduce((p, c) => p + (c.type === 'CREDIT' ? c.amount : 0), 0)} ({transactions.filter(i => i.type === 'CREDIT').length})</p>
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
                            <h2 className='font-weight-bolder mb-0'>Debits</h2>
                            <p className='card-text'>₹ {transactions.reduce((p, c) => p + (c.type === 'DEBIT' ? c.amount : 0), 0)} ({transactions.filter(i => i.type === 'DEBIT').length})</p>
                        </div>
                        <div className={`avatar avatar-stats p-50 m-0 bg-light-danger`}>
                            <div className='avatar-content'><AlertOctagon size={28} /></div>
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
                            <h2 className='font-weight-bolder mb-0'>Payouts</h2>
                            <p className='card-text'>₹ 0.00 (0)</p>
                        </div>
                        <div className={`avatar avatar-stats p-50 m-0 bg-light-warning`}>
                            <div className='avatar-content'><ArrowUpCircle size={28} /></div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Col>
        
        <Col sm="12" md="12">
            <Card>
                <CardHeader className="d-flex justify-content-between">
                    <CardTitle>Wallet Transactions</CardTitle>
                    {/* <Button type="button" color="primary" onClick={toggleModel}>Create Customer</Button> */}
                </CardHeader>
                <hr className="m-0" />
                
                <CustomDataTable slCheckBox={false} data={transactions} columns={(userData.user.role !== 'ADMIN') ? tableColumns.filter(i => i.selector !== 'userName') : tableColumns} />

            </Card>
        </Col>

        <Col sm="12" md="12">
            <Card>
                <CardHeader className="d-flex justify-content-between">
                    <CardTitle>Payout Transactions</CardTitle>
                    {/* <Button type="button" color="primary" onClick={toggleModel}>Create Customer</Button> */}
                </CardHeader>
                <hr className="m-0" />
                
                <CustomDataTable slCheckBox={false} data={[]} columns={tableColumns} />

            </Card>
        </Col>
    </Row>)
}

export default Wallet