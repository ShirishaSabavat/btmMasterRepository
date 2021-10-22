import React, {useState, useEffect} from "react"
import {Row, Col, Card, CardHeader, CardTitle, Button, Badge} from "reactstrap"
import DataTable from "react-data-table-component"
import {Link} from "react-router-dom"
import {Edit, Trash, Eye} from "react-feather"
import {useDispatch, useSelector} from "react-redux"
import CustomDataTable from '../../components/dataTable/CustomDataTable'
import DeleteModal from "./Modals/DeleteModal"
import {fetchAllCourseSchedules, deleteCourseSchedule} from "../../redux/actions/courseSchedule/index"

const CourseSchedule = () => {

  const dispatch = useDispatch()
  const workshopData = useSelector(state => state.courseSchedule.courseSchedules)
  
  const [showDelete, setShowDelete] = useState(false)

  useEffect(() => {
    dispatch(fetchAllCourseSchedules())
  }, [])

    const tableColumns = [
        {
          name: "Batch No",
          selector: "batchNo",
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500 text-truncate mb-0">{row.batchNo}</p>
          )
        },
        {
          name: "Course Name",
          selector: "courseName",
          sortable: true,
          cell: (row) => (
                <p>
                  {row.courseId?.name}
                </p>
          )
        },
        {
          name: "Date",
          selector: "date",
          sortable: true,
          height:"200px",
          cell: (row) => (
            <div className="d-flex flex-wrap">
              <p className="text-bold-500 text-wrap mb-0">From: {new Date(row.startDate).toLocaleDateString()}</p>
              <p className="text-bold-500 mb-0">To: {new Date(row.endDate).toLocaleDateString()}</p>
            </div>
          )
        },
        {
          name: "Address",
          selector: "address",
          sortable: true,
          cell: (row) => (
            <p className="mb-0">
              <a href={row.location} title="View On Map" target="_blank" rel="noopener">
                {row.address}
              </a>
            </p>
          )
        },
        {
          name: "Faculty",
          selector: "faculty",
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500 text-truncate mb-0">{row.faculty?.name}</p>
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
                        <Link to={{pathname: "/view-course-schedule", params: row._id}}>
                            <Eye size={15} />
                        </Link>
                        </Button>
                    </li>
                    <li className="list-inline-item">
                        <Button
                        className="btn-icon rounded-circle"
                        color="flat-warning"
                        >
                        <Link to={`/edit-course-schedule/${row._id}`}>
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

    return <Row>
        <Col sm="12" md="12">
            <Card >
                <CardHeader>
                    <CardTitle>Course Schedule</CardTitle>
                    <Button color="primary" type="button"><Link to="/add-course-schedule" className="text-white">Add</Link></Button>
                </CardHeader>
                <hr className="m-0" />

                <CustomDataTable 
                  setShowDelete={setShowDelete}
                  showDelete={showDelete}
                  confirmDelete={() => dispatch(deleteCourseSchedule(showDelete))}
                  data={workshopData} 
                  columns={tableColumns} />
                
            </Card>
        </Col>
    </Row>
}

export default CourseSchedule