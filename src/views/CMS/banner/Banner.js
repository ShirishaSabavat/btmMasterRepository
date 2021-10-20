import React, {useState} from "react"
import {Row, Col, Card, CardHeader, CardTitle, Button} from "reactstrap"
import {Trash, Edit} from "react-feather"
import {Link} from "react-router-dom"
import DeleteModal from "./Modals/DeleteModal"
import CustomDataTable from '../../../components/dataTable/CustomDataTable'
import {BASE_URL} from '../../../utility/serverSettings'

const Banner = () => {

  const usersData = [{sno: 1, name: "sample", email: "sam@sam.com", phone: 8099009900, message: "This is sample"}]

  const [defaultAlert, setDefaultAlert] = useState({
    alert: false,
    did: ""
  })
  const [confirmAlert, setConfirmAlert] = useState(false)
  const [cancelAlert, setCancelAlert] = useState(false)

  const defaultAlertHandler = (value) => {
    setDefaultAlert({ alert: value.alert, did: value.did })
  }
  const confirmAlertHandler = (value) => {
    setConfirmAlert(value)
  }
  const cancelAlertHandler = (value) => {
    setCancelAlert(value)
  }

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
          name: "Image",
          selector: "image",
          sortable: true,
          cell: (row) => (
            <img style={{marginTop: "5px", marginBottom: "5px"}} src={`${BASE_URL}uploads/${row.image}`} width="58px" height="58px" alt="image" />
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
                        <Link to={{pathname: "/edit-banner", params: {id}}}>
                            <Edit size={15} />
                        </Link>
                        </Button>
                    </li>
                    <li className="list-inline-item">
                        <Button
                        className="btn-icon rounded-circle"
                        color="flat-danger"
                        onClick={() => defaultAlertHandler({ alert: true, did: id })}
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
                    <CardTitle> Banner Settings </CardTitle>
                    <Link to="/add-banner" className="text-white"><Button color="primary" type="button">Add</Button></Link>
                </CardHeader>
                <hr className="m-0" />

                <CustomDataTable data={usersData} columns={tableColumns} />

                <hr />
                <div style={{ height: 300, width: '99%', margin: "auto" }}>
                </div>
                 {defaultAlert.alert ? (
                  <DeleteModal
                    defaultAlertHandler={defaultAlertHandler}
                    confirmAlertHandler={confirmAlertHandler}
                    cancelAlertHandler={cancelAlertHandler}
                    defaultAlert={defaultAlert.alert}
                    confirmAlert={confirmAlert}
                    cancelAlert={cancelAlert}
                  />
                ) : null}
            </Card>
        </Col>
    </Row>
}

export default Banner