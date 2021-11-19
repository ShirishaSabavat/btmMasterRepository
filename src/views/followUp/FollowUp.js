import React, {useState, useEffect} from "react"
import {Row, Col, Card, CardHeader, CardTitle, Button, Badge} from "reactstrap"
import {Edit, Trash, Phone} from "react-feather"
import {useDispatch, useSelector} from "react-redux"
import CustomDataTable from '../../components/dataTable/CustomDataTable'
import TableDataLoadingSkleton from '../../components/skleton/TableDataLoadingSkleton'
import AddModal from './Modals/AddModal'
import EditModal from './Modals/EditModal'
import FollowUpModal from './Modals/FollowUpModal'
import { fetchAllFollowUp, DeleteFollowUp } from '../../redux/actions/followup/index'
 
const FollowUp = () => {

  const dispatch = useDispatch()
  const loading = useSelector(state => state.common.loading)

  const [showDelete, setShowDelete] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editModal, setEditModal] = useState({show: false, id: ""})
  const [followUpModal, setFollowUpModal] = useState({show: false, id: ""})
  const data = useSelector(state => state.followup.followup)

  useEffect(() => {
    dispatch(fetchAllFollowUp())
  }, [])

  const tableColumns = [
    {
        name: "Name",
        selector: "name",
        sortable: true,
        cell: (row) => (
          <p className="text-bold-500 mb-0">{row.name}</p>
        )
    },
    {
      name: "Phone",
      selector: "phone",
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 mb-0">{row.phone}</p>
      )
    },
    {
      name: "Source",
      selector: "source",
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 mb-0">{row.source}</p>
      )
    },
    {
        name: "Enquiry Date",
        selector: "enquiryDate",
        sortable: true,
        cell: (row) => (
          <p className="text-bold-500 mb-0">{new Date(row.enquiryDate).toDateString()}</p>
        )
    },
    {
      name: "Last Follo Up Date",
      selector: "lastFollowUpDate",
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 mb-0">{new Date(row.lastFollowUpDate).toDateString()}</p>
      )
    },
    {
      name: "Next Follo Up Date",
      selector: "nextFollowUpDate",
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 mb-0">{new Date(row.nextFollowUpDate).toDateString()}</p>
      )
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
      cell: (row) => (
        <Badge color={row.status === "ACTIVE" ? "warning" : row.status === "closed" ? "success" : "info"} pill>
          <span>{row.status}</span>
        </Badge>
      )
    },
    {
      name: "Actions",
      selector: "",
      sortable: true,
      minWidth: '160px',
      cell: (row) => {
        return (
          <div className="d-flex flex-column align-items-center">
            <ul className="list-inline mb-0">
                <li className="list-inline-item">
                    <Button
                    className="btn-icon rounded-circle"
                    color="flat-warning"
                    onClick={() => setFollowUpModal(prevState => { return {show: !prevState.show, id: row._id} })}
                    >
                      <Phone size={15} />
                    </Button>
                </li>
                <li className="list-inline-item">
                    <Button
                    className="btn-icon rounded-circle"
                    color="flat-warning"
                    onClick={() => setEditModal(prevState => { return {show: !prevState.show, id: row._id} })}
                    >
                      <Edit size={15} />
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

  const customStyles = {
    headCells: {
        style: {
           color: "#444",
           fontWeight: "bold"
        }
    }
  }

    return <Row>
        <Col sm="12" md="12">
          <Card>
            <CardHeader>
                <CardTitle>Follow Up</CardTitle>
                <Button color="primary" onClick={() => { setShowModal(prevState => !prevState) }} >Add</Button>
            </CardHeader>

            <hr className="m-0" />
            
            <CustomDataTable 
                setShowDelete={setShowDelete}
                showDelete={showDelete}
                confirmDelete={() => dispatch(DeleteFollowUp(showDelete))}
                data={data} 
                columns={tableColumns} 
                customStyles={customStyles}
            />
          </Card>
        </Col>
        <AddModal showModal={showModal} setShowModal={setShowModal} />
        <EditModal editModal={editModal} setEditModal={setEditModal} />
        <FollowUpModal followUpModal={followUpModal} setFollowUpModal={setFollowUpModal} />
    </Row>
}

export default FollowUp