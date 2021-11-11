import React, {useState, useEffect} from "react"
import {Row, Col, Card, CardHeader, CardTitle, Button, Badge, UncontrolledTooltip} from "reactstrap"
import {Trash, Eye} from "react-feather"
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import CustomDataTable from '../../components/dataTable/CustomDataTable'
import { fetchAllUsersData, deleteUser } from "../../redux/actions/user/index"
import {toast} from 'react-toastify'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import {PRODUCTION_URL} from '../../utility/serverSettings'
import TableDataLoadingSkleton from '../../components/skleton/TableDataLoadingSkleton'

const UserTable = () => {

  const dispatch = useDispatch()
  const usersData = useSelector(state => state.user.users)
  const loading = useSelector(state => state.common.loading)

  const [showDelete, setShowDelete] = useState(false)

  useEffect(() => {
    dispatch(fetchAllUsersData())
  }, [])

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
                  className="d-block text-bold-500 mb-0"
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
            <Badge color={row.role === "USER" ? "light-primary" : "light-warning"} pill>
              <span>{row.role.replace('_USER', '')}</span>
            </Badge>
          )
        },
        {
          name: "Referral Code",
          selector: "referralCode",
          width:"154px",
          sortable: true,
          cell: (row) => (
            <>
            <CopyToClipboard text={`${PRODUCTION_URL}home?referral=${row.referralCode}`}
              onCopy={() => toast.success("Referral link copied!")}>
                <span className="pointer cursor" style={{fontSize: 11}} id={`${row.referralCode}-user-referral-link`}>
                  {row.referralCode}
                </span>
            </CopyToClipboard>
            <UncontrolledTooltip placement='top' target={`${row.referralCode}-user-referral-link`}>
              Click to copy referral link
            </UncontrolledTooltip>
            </>
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
          name: "Parent",
          selector: "parent",
          sortable: true,
          width:"184px",
          cell: (row) => (
            <p className="text-bold-500 mb-0" title="View Parent">
              {row.referral !== 'DIRECT' && (
                <Link to={`/view-user-data/${row.myParent}`}>
                  {row.referral}
                </Link>
              )}
              {row.referral === 'DIRECT' && (
                <>{row.referral}</>
              )}
            </p>
          )
        },
        // {
        // name: "Phone No",
        // selector: "phone",
        // sortable: true,
        // cell: (row) => (
        //     <p className="text-bold-500 text-truncate mb-0">{row.phone}</p>
        // )
        // },
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
                    <li className="list-inline-item">
                        <Button
                        className="btn-icon rounded-circle"
                        color="flat-danger"
                        onClick={() => setShowDelete(row._id)}
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
                  data={usersData} 
                  columns={tableColumns} />

            </Card>
        </Col>
    </Row>
}

export default UserTable