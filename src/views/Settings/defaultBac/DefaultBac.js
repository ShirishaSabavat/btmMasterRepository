import React, {useState, useEffect} from "react"
import {Row, Col, Card, CardHeader, CardTitle, Button, Badge, UncontrolledTooltip} from "reactstrap"
import {Trash, Eye} from "react-feather"
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import CustomDataTable from '../../../components/dataTable/CustomDataTable'
import { fetchAllUsersData, deleteUser } from "../../../redux/actions/user/index"
import {toast} from 'react-toastify'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {PRODUCTION_URL} from '../../../utility/serverSettings'
import TableDataLoadingSkleton from '../../../components/skleton/TableDataLoadingSkleton'

const DefaultBac = () => {

  const dispatch = useDispatch()
  const usersData = useSelector(state => state.user.users)
  const loading = useSelector(state => state.common.loading)

  const [showDelete, setShowDelete] = useState(false)

  useEffect(() => {
    dispatch(fetchAllUsersData(true))
  }, [])

    const tableColumns = [
        {
          name: "Name",
          selector: "name",
          sortable: true,
          cell: (row) => (
                <Link to={`/view-user-data/${row._id}`}>
                  <p
                    className="d-block text-dark text-bold-500 mb-0"
                  >
                    {row.name}
                  </p>
                </Link>
          )
        },
        {
          name: "Role",
          selector: "role",
          sortable: true,
          cell: (row) => (
            <Badge className="pointer" color={row.role === "USER" ? "light-primary" : "light-warning"} pill>
              <span id="user-type">{row.role.replace('_USER', '')}</span>
              {row.role !== "USER" && (
                <UncontrolledTooltip placement='top' target='user-type'>
                  This user is a Consultant
                </UncontrolledTooltip>
              )}
              {row.role === "USER" && (
                <UncontrolledTooltip placement='top' target='user-type'>
                  This is a basic user
                </UncontrolledTooltip>
              )}
            </Badge>
          )
        },
        {
          name: "Referral Code",
          selector: "referralCode",
          width:"154px",
          sortable: true,
          cell: (row) => (
            <span className="pointer cursor" style={{fontSize: 11}} id={`${row.referralCode}-user-referral-link`}>
                {row.referralCode}
            </span>
          )
        },
        {
          name: "Rank",
          selector: "rank",
          sortable: true,
          cell: (row) => (
            <>
              {row.rank && (
                <Badge className="badge-glow" color={row.rank === "BAC" ? "primary" : row.rank === "BASC" ? "info" : row.rank === "BACGM" ? "success" : "warning"} pill>
                  <span>{row.rank}</span>
                </Badge>
              )}
            </>
          )
        },
        {
        name: "KYC",
        selector: "kyc",
        sortable: true,
        cell: (row) => (
          <>
            {row.role === 'BAC_USER' && (
              <Badge color={row.kycStatus === "VERIFIED" ? "light-success" : row.kycStatus === "PROCESSING" ? "light-warning" : "light-danger"} pill>
                <span>{row.kycStatus.toUpperCase()}</span>
              </Badge>
            )}
          </>
        )
        },
        {
          name: "Date",
          selector: "date",
          sortable: true,
          width:"124px",
          cell: (row) => (
            <div className="d-flex flex-wrap">
              <p style={{fontSize: 11}} className="text-bold-500 text-wrap mb-0">{(new Date(row.createdAt)).toLocaleString('en-GB', { timeZone: 'UTC', hour12: true })}</p>
            </div>
          )
        },
        {
          name: "Status",
          selector: "status",
          sortable: true,
          cell: (row) => (
            <Badge color={row.status === "ACTIVE" ? "light-success" : "light-danger"} pill>
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
                        className="btn-icon rounded-circle"
                        color="flat-warning"
                        >
                        <Link to={`/view-user-data/${row._id}`}>
                            <Eye size={15} />
                        </Link>
                        </Button>
                    </li>
                    {/* <li className="list-inline-item">
                        <Button
                        className="btn-icon rounded-circle"
                        color="flat-danger"
                        onClick={() => setShowDelete(row._id)}
                        >
                            <Trash size={15} />
                        </Button>
                    </li>             */}
                </ul>
              </div>
            )
          }
        }
      ]
    
    if (loading) {
      return (
        <TableDataLoadingSkleton />
      )
    }

    return <Row>
        <Col sm="12" md="12">
            <Card >
                <CardHeader>
                    <CardTitle>Customers</CardTitle>
                </CardHeader>
                <hr className="m-0" />

                <CustomDataTable 
                  setShowDelete={setShowDelete}
                  showDelete={showDelete}
                  confirmDelete={() => dispatch(deleteUser(showDelete))}
                  data={usersData.reverse()} 
                  columns={tableColumns} />

            </Card>
        </Col>
    </Row>
}

export default DefaultBac