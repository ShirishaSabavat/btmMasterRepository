import React, {useState, useEffect} from "react"
import {Row, Col, Card, CardHeader, CardTitle, Button, Badge} from "reactstrap"
import {Trash, Eye} from "react-feather"
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import CustomDataTable from '../../components/dataTable/CustomDataTable'
import { fetchAllUsersData, deleteUser } from "../../redux/actions/user/index"

const UserTable = () => {

  const dispatch = useDispatch()
  const usersData = useSelector(state => state.user.users)

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
                  className="d-block text-bold-500 text-truncate mb-0"
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
            <Badge color={row.role === "USER" ? "primary" : "warning"} pill>
              <span>{row.role.replace('_USER', '')}</span>
            </Badge>
          )
        },
        {
          name: "Referral Code",
          selector: "referralCode",
          sortable: true,
          cell: (row) => (
            <span style={{fontSize: 11}}>{row.referralCode}</span>
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
              <Badge color={row.kycStatus === "VERIFIED" ? "success" : row.kycStatus === "PROCESSING" ? "warning" : "danger"} pill>
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
          height:"200px",
          cell: (row) => (
            <div className="d-flex flex-wrap">
              <p className="text-bold-500 text-wrap mb-0">{(new Date(row.createdAt)).toLocaleString()}</p>
            </div>
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

    return <Row>
        <Col sm="12" md="12">
            <Card >
                <CardHeader>
                    <CardTitle>Users</CardTitle>
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