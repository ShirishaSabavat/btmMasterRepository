import React, {useState} from "react"
import {Row, Col, CardHeader, CardTitle, Button} from "reactstrap"
import {Link} from "react-router-dom"
import {Edit, Trash, Phone} from "react-feather"
import {useDispatch, useSelector} from "react-redux"
import CustomDataTable from '../../components/dataTable/CustomDataTable'
import TableDataLoadingSkleton from '../../components/skleton/TableDataLoadingSkleton'
import { fontWeight } from "@mui/system"

const AdmissionEnquiry = () => {
    // api call redux function
    const deleteAdmissionEnquiryById = () => {

    }

  const dispatch = useDispatch()
  const loading = useSelector(state => state.common.loading)

  const [showDelete, setShowDelete] = useState(false)

  const tableColumns = [
    {
        name: "Name",
        selector: "name",
        sortable: true,
        cell: (row) => (
          <p className="text-bold-500 text-truncate mb-0">{row.name}</p>
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
      name: "Source",
      selector: "source",
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 text-truncate mb-0">{row.source}</p>
      )
    },
    {
        name: "Enquiry Date",
        selector: "enquiryDate",
        sortable: true,
        cell: (row) => (
          <p className="text-bold-500 text-truncate mb-0">{row.enquiryDate}</p>
        )
    },
    {
      name: "Last Follo Up Date",
      selector: "lastFollowUpDate",
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 text-truncate mb-0">{row.lastFollowUpDate}</p>
      )
    },
    {
      name: "Next Follo Up Date",
      selector: "nextFollowUpDate",
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 text-truncate mb-0">{row.nextFollowUpDate}</p>
      )
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 text-truncate mb-0">{row.status}</p>
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
                    >
                    <Link to={`/edit-video/${row._id}`}>
                        <Phone size={15} />
                    </Link>
                    </Button>
                </li>
                <li className="list-inline-item">
                    <Button
                    className="btn-icon rounded-circle"
                    color="flat-warning"
                    >
                    <Link to={`/edit-video/${row._id}`}>
                        <Edit size={15} />
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

  const admissionEnquiryData = [ 
        {
            _id: "1234",
            name: 'sample name',
            phone: '82828349292',
            source: 'sample source',
            enquiryDate: "12-12-2021",
            lastFollowUpDate: '14-12-2021',
            nextFollowUpDate: "15-12-2021", 
            status: 'ACTIVE'
        }
    ]

  if (loading) {
    return (
      <TableDataLoadingSkleton />
    )
  }

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
            <CardHeader>
                <CardTitle>Admission Enquiry</CardTitle>
                <Link to="/add-admission-enquiry" className="text-white"><Button color="primary" type="button">Add</Button></Link>
            </CardHeader>

            <hr className="m-0" />
            
            <CustomDataTable 
                setShowDelete={setShowDelete}
                showDelete={showDelete}
                confirmDelete={() => dispatch(deleteAdmissionEnquiryById(showDelete))}
                data={admissionEnquiryData} 
                columns={tableColumns} 
                customStyles={customStyles}
            />
        </Col>
    </Row>
}

export default AdmissionEnquiry