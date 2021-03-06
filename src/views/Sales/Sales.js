import React, {useEffect} from "react"
import {Row, Col, Card, CardHeader, CardTitle, CardBody, Button, Badge, UncontrolledTooltip} from "reactstrap"
import DataTable from "react-data-table-component"
import {Link, useHistory} from "react-router-dom"
import {Eye, ArrowUpCircle, Award, BarChart2, BarChart} from "react-feather"
import {useDispatch, useSelector} from "react-redux"
import CustomDataTable from '../../components/dataTable/CustomDataTable'

import { fetchAllSales } from "../../redux/actions/sales/index"
import TableDataLoadingSkleton from '../../components/skleton/TableDataLoadingSkleton'

const Sales = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const salesData = useSelector(state => state.sales.sales)
  const loading = useSelector(state => state.common.loading)

  useEffect(() => {
    dispatch(fetchAllSales())
  }, [])

    const tableColumns = [
        {
            name: "S.No",
            selector: "sno",
            sortable: true,
            cell: (row) => (
              <p className="mb-0">{row.sno}</p>
            )
        },
        {
          name: "User Name",
          selector: "name",
          minWidth: "200px",
          sortable: true,
          cell: (row) => (
            <>
              <p id="sale-user" className="text-bold-500 mb-0">
                <Link className="text-dark" to={`/view-user-data/${row.userId?._id}`}>
                  {row.userId?.name}
                </Link>
              </p>
              <UncontrolledTooltip placement='top' target="sale-user">
                View user account
              </UncontrolledTooltip>
            </>
          )
        },
        {
          name: "Course Name",
          selector: "courseName",
          sortable: true,
          cell: (row) => (
            <>
              <p id="sale-course" className="text-dark text-bold-500 mb-0">
                <Link className="text-dark" to={`/edit-course/${row.courseId?._id}`}>
                  {row.courseId?.name}
                </Link>
              </p>
              <UncontrolledTooltip placement='top' target="sale-course">
                View Course
              </UncontrolledTooltip>
            </>
          )
        },
        {
          name: "Purchase Type",
          selector: "purchaseType",
          sortable: true,
          minWidth: "200px",
          cell: (row) => (
            <Badge color={row.purchaseType === "WORKSHOP" ? "info" : "primary"} pill>
              <span>{row.purchaseType}</span>
            </Badge>
          )
        },
        {
          name: "Course Type",
          selector: "courseType",
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500 mb-0">{row.courseId?.type}</p>
          )
        },
        {
          name: "Referral",
          selector: "referral",
          minWidth: "200px",
          sortable: true,
          cell: (row) => (
            <>
              <p id="sale-referral" className="text-dark text-bold-500 mb-0">
                <Link className="text-dark" to={`/view-user-data/${row.userId?.myParent}`}>
                  {row.referral}
                </Link>
              </p>
              <UncontrolledTooltip placement='top' target="sale-referral">
                View refferal user account
              </UncontrolledTooltip>
            </>
          )
        },
        {
          name: "Date",
          selector: "purchaseDate",
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500 mb-0">{new Date(row.purchaseDate).toLocaleString('en-GB', { timeZone: 'UTC', hour12: true })}</p>
          )
        },
        {
          name: "Paid Amount",
          selector: "paidAmount",
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500 mb-0">??? {row.paid?.toLocaleString('en-IN')}</p>
          )
        },
        // {
        //   name: "Commisions",
        //   selector: "commisions",
        //   sortable: true,
        //   cell: (row) => (
        //     <p className="text-bold-500 mb-0">??? {row.comissions}</p>
        //   )
        // },
        // {
        //   name: "Profit",
        //   selector: "paidAmount",
        //   sortable: true,
        //   cell: (row) => (
        //     <p className="text-bold-500 mb-0">??? {row.netProfit}</p>
        //   )
        // },
        {
          name: "Status",
          selector: "status",
          sortable: true,
          cell: (row) => (
            <Badge color={row.status === "COMPLETED" ? "success" : "danger"} pill>
                <span>{row.status.toUpperCase()}</span>
            </Badge>
          )
        },
        {
          name: "Actions",
          selector: "",
          sortable: true,
          cell: (row) => {
            return (
              <div className="d-flex flex-column align-items-center">
                <ul className="list-inline mb-0">
                    <li className="list-inline-item">
                        <Button
                          onClick={() => history.push(`/view-sales/${row._id}`)}
                          className="btn-icon rounded-circle"
                          color="flat-warning"
                        >
                          <Eye size={15} />
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

    // const salesData = [{sno: "1", _id:"124", purchaseType: "WORKSHOP", name: "Sample 1", date: "2-2-2021", paidAmount: "100", status: "ACTIVE" }]

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
                            <h2 className='font-weight-bolder mb-0'>Sales</h2>
                            <p className='card-text'>??? {salesData.reduce((p, c) => p + (c.paid ? c.paid : 0), 0).toLocaleString('en-IN')} ({salesData.length.toLocaleString('en-IN')})</p>
                        </div>
                        <div className={`avatar avatar-stats p-50 m-0 bg-light-success`}>
                            <div className='avatar-content'><BarChart size={28} /></div>
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
                            <h2 className='font-weight-bolder mb-0'>Commisions</h2>
                            <p className='card-text'>??? {salesData.reduce((p, c) => p + (c.comissions ? c.comissions : 0), 0).toLocaleString('en-IN')} ({salesData.filter(i => (i.comissions !== undefined)).length.toLocaleString('en-IN')})</p>
                        </div>
                        <div className={`avatar avatar-stats p-50 m-0 bg-light-danger`}>
                            <div className='avatar-content'><Award size={28} /></div>
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
                            <h2 className='font-weight-bolder mb-0'>Profit</h2>
                            <p className='card-text'>??? {salesData.reduce((p, c) => p + (c.netProfit ? c.netProfit : 0), 0).toLocaleString('en-IN')}</p>
                        </div>
                        <div className={`avatar avatar-stats p-50 m-0 bg-light-success`}>
                            <div className='avatar-content'><BarChart2 size={28} /></div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Col>

        <Col sm="12" md="12">
            <Card >
                <CardHeader>
                    <CardTitle>Sales</CardTitle>
                </CardHeader>
                <hr className="m-0" />

                <CustomDataTable data={salesData} columns={tableColumns} />

            </Card>
        </Col>
    </Row>
}

export default Sales