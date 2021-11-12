import React, {useState, useEffect} from "react"
import {Row, Col, Card, CardHeader, CardTitle, Button} from "reactstrap"
import {Trash, Eye} from "react-feather"
import {useDispatch, useSelector} from "react-redux"
import CustomDataTable from '../../components/dataTable/CustomDataTable'

import Modal from "./Modals/Modal"
import {fetchAllInquires, deleteInquiryById} from "../../redux/actions/inquiry/index"
import TableDataLoadingSkleton from '../../components/skleton/TableDataLoadingSkleton'

const Inquiry = () => {

  const dispatch = useDispatch()
  const usersData = useSelector(state => state.inquiry.inquries)
  const loading = useSelector(state => state.common.loading)

  useEffect(() => {
    dispatch(fetchAllInquires())
  }, [])

  const [showDelete, setShowDelete] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState("")

  const showMessageModalHandler = (message) => {
    setShowModal(prevState => !prevState)
    setData(message)
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
          name: "Email",
          selector: "email",
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500 text-truncate mb-0">{row.email}</p>
          )
        },
        {
          name: "Phone",
          selector: "phone",
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500 text-truncate mb-0">{row.phone}</p>
          )
        },
        {
          name: "Message",
          selector: "message",
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500 text-truncate mb-0">{row.message}</p>
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
                        onClick={() => showMessageModalHandler(row.message)}
                        >
                          <Eye size={15} />
                        </Button>
                    </li>
                    <li className="list-inline-item">
                        <Button
                        className="btn-icon rounded-circle"
                        color="flat-danger"
                        onClick={() => setShowDelete(id)}
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
                    <CardTitle> Inquery</CardTitle>
                </CardHeader>
                <hr className="m-0" />

                <CustomDataTable 
                  data={usersData}
                  columns={tableColumns}
                  setShowDelete={setShowDelete}
                  showDelete={showDelete}
                  confirmDelete={() => dispatch(deleteInquiryById(showDelete))} 
                  />

                <hr />
                <div style={{ height: 300, width: '99%', margin: "auto" }}>
                </div>
                {showModal ? <Modal showModal={showModal} setShowModal={setShowModal} formTitle="Inquiry Message" data={data} /> : null}
            </Card>
        </Col>
    </Row>
}

export default Inquiry