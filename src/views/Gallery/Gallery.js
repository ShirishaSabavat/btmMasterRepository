import React, {useEffect, useState} from "react"
import {Row, Col, Card, CardHeader, CardTitle, Button, Badge} from "reactstrap"
import DataTable from "react-data-table-component"
import {Link} from "react-router-dom"
import {Edit, Trash} from "react-feather"
import ScheduleModal from "./Modals/Modal"
import DeleteModal from "./Modals/DeleteModal"
import CustomDataTable from '../../components/dataTable/CustomDataTable'
import { useDispatch, useSelector } from "react-redux"
import { fetchAllGallery, deleteGallery } from '../../redux/actions/gallery'
import {BASE_URL} from '../../utility/serverSettings'

const Gallery = () => {

  const dispatch = useDispatch()

  const galleryImages = useSelector(state => state.gallery.galleryImages)

  useEffect(() => {
    dispatch(fetchAllGallery())
  }, [])

  const [showDelete, setShowDelete] = useState(false)

  const tableColumns = [
    {
      name: "Title",
      selector: "name",
      sortable: true,
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
      name: "Image",
      selector: "image",
      sortable: true,
      cell: (row) => (
        <img src={`${BASE_URL}uploads/${row.file}`} width="154" className="img-fluid p-1" />
      )
    },
    {
      name: "Date",
      selector: "date",
      sortable: true,
      cell: (row) => (
        <p>{(new Date(row.createdAt)).toLocaleString()}</p>
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
                    color="flat-warning"
                    >
                    <Link to={{pathname: "/edit-gallery"}}>
                        <Edit size={15} />
                    </Link>
                    </Button>
                </li> */}
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
                  <CardTitle>Gallery</CardTitle>
                  <Link to="/add-gallery" className="text-white"><Button color="primary" type="button">Add</Button></Link>
              </CardHeader>
              <hr className="m-0" />

              <CustomDataTable 
                setShowDelete={setShowDelete}
                showDelete={showDelete}
                confirmDelete={() => dispatch(deleteGallery(showDelete))}
                data={galleryImages} 
                columns={tableColumns} />

          </Card>
      </Col>
  </Row>
}

export default Gallery