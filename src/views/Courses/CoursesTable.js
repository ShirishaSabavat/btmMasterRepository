import React, {useState, useEffect} from "react"
import {Row, Col, Card, CardHeader, CardTitle, Button} from "reactstrap"
import DataTable from "react-data-table-component"
import {Link} from "react-router-dom"
import {Calendar, Edit, Trash, Eye} from "react-feather"
import { useDispatch, useSelector } from "react-redux"
import CustomDataTable from '../../components/dataTable/CustomDataTable'
import TableDataLoadingSkleton from '../../components/skleton/TableDataLoadingSkleton'

import {fetchAllCourses, deleteCourseById} from "../../redux/actions/courses/index"

const CourseTable = () => {

  const dispatch = useDispatch()
  const courseData = useSelector(state => state.courses.courses)
  const loading = useSelector(state => state.common.loading)
  
  const [showDelete, setShowDelete] = useState(false)

  useEffect(() => {
    dispatch(fetchAllCourses())
  }, [])

    const tableColumns = [
        {
          name: "Course Name",
          selector: "name",
          sortable: true,
          minWidth: "200px",
          cell: (row) => (
            <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
              <div className="user-info text-truncate ml-xl-50 ml-0">
                <span
                  title={row.name}
                  className="d-block text-bold-500 text-truncate mb-0"
                >
                  {row.name}
                </span>
              </div>
            </div>
          )
        },
        {
          name: "Code",
          selector: "code",
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500 text-truncate mb-0">{row.code}</p>
          )
        },
        {
          name: "Type",
          selector: "type",
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500 text-truncate mb-0">{row.type}</p>
          )
        },
        {
          name: "Price",
          selector: "price",
          sortable: true,
          cell: (row) => (
            <p className="text-bold-500 text-truncate mb-0">₹ {row.price.toLocaleString('en-IN')}</p>
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
                    {/* <li className="list-inline-item">
                        <Button
                        className="btn-icon rounded-circle"
                        color="flat-info"
                        >
                          <Link to="/schedule-table">
                            <Eye size={15} />
                          </Link>
                        </Button>
                    </li>             */}
                    <li className="list-inline-item">
                        <Button
                        className="btn-icon rounded-circle"
                        color="flat-warning"
                        >
                        <Link to={`/edit-course/${row._id}`}>
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
    
    if (loading) {
      return (
        <TableDataLoadingSkleton />
      )
    }

    return <Row>
        <Col sm="12" md="12">
            <Card >
                <CardHeader>
                    <CardTitle>Courses</CardTitle>
                    <Link to="/add-course" className="text-white"><Button color="primary" type="button">Add</Button></Link>
                </CardHeader>
                <hr className="m-0" />

                <CustomDataTable 
                  setShowDelete={setShowDelete}
                  showDelete={showDelete}
                  confirmDelete={() => dispatch(deleteCourseById(showDelete))}
                  data={courseData} 
                  columns={tableColumns} 
                />
                
            </Card>
        </Col>
    </Row>
}

export default CourseTable