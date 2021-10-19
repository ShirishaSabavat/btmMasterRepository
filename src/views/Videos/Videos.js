import React, {useState, useEffect} from "react"
import {Row, Col, Card, CardHeader, CardTitle, Button, Badge} from "reactstrap"
import DataTable from "react-data-table-component"
import {Link} from "react-router-dom"
import {Edit, Trash} from "react-feather"
import {useDispatch, useSelector} from "react-redux"
import CustomDataTable from '../../components/dataTable/CustomDataTable'

import {fetchAllVideos, deleteVideoById} from "../../redux/actions/videos/index"
// import sampleImg from "/assets/images/default-image.jpg"
import {BASE_URL} from '../../utility/serverSettings'

const Videos = () => {

  const dispatch = useDispatch()
  const videosData = useSelector(state => state.videos.videos)

  useEffect(() => {
    dispatch(fetchAllVideos())
  }, [])

  const [showDelete, setShowDelete] = useState(false)

  const tableColumns = [
    {
        name: "S.No",
        selector: "_id",
        sortable: true,
        cell: (row) => (
          <p className="text-bold-500 text-truncate mb-0">{row.sno}</p>
        )
    },
    {
      name: "Video Name",
      selector: "title",
      sortable: true,
      minWidth: "200px",
      cell: (row) => (
        <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
          <div className="user-info text-truncate ml-xl-50 ml-0">
            <span
              title={row.title}
              className="d-block text-bold-500 text-truncate mb-0"
            >
              {row.title}
            </span>
          </div>
        </div>
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
      name: "Video Link",
      selector: "link",
      sortable: true,
      cell: (row) => (
        <Badge color='primary'>
          <a className="text-white" target="_blank" href={row.link}>Link</a>
        </Badge>
      )
    },
    {
      name: "Duration",
      selector: "duration",
      sortable: true,
      cell: (row) => (
        <p className="text-bold-500 text-truncate mb-0">{row.duration}</p>
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
                    <Link to={{pathname: "/edit-video", params:{id}}}>
                        <Edit size={15} />
                    </Link>
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

    return <Row>
        <Col sm="12" md="12">
            <Card >
                <CardHeader>
                  <CardTitle>Videos</CardTitle>
                  <Link to="/add-video" className="text-white"><Button color="primary" type="button">Add</Button></Link>
                </CardHeader>

                <hr className="m-0" />
                
                <CustomDataTable 
                  setShowDelete={setShowDelete}
                  showDelete={showDelete}
                  confirmDelete={() => dispatch(deleteVideoById(showDelete))}
                  data={videosData} 
                  columns={tableColumns} 
                />
            </Card>
        </Col>
    </Row>
}

export default Videos