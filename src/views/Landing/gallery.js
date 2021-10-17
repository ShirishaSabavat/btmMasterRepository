import { useState, useCallback, useEffect } from 'react'
import { useSkin } from '@hooks/useSkin'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { Row, Col} from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import {Grid} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import NavBar from './components/navbar'
import Footer from './components/footer'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import Gallery from 'react-photo-gallery'
import Carousel, { Modal, ModalGateway } from "react-images"
import { fetchAllGallery } from '../../redux/actions/gallery'
import {BASE_URL} from '../../utility/serverSettings'

const photos = [
    {
      src: '/assets/images/br3.jpg',
      width: 4,
      height: 4
    },
    {
      src: '/assets/images/br5.jpg',
      width: 4,
      height: 4
    },
    {
      src: '/assets/images/br4.jpg',
      width: 4,
      height: 4
    },
    {
      src: '/assets/images/w1.jpg',
      width: 4,
      height: 4
    },
    {
      src: '/assets/images/w2.jpg',
      width: 4,
      height: 4
    }
  ]


const GalleryPage = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [skin, setSkin] = useSkin()

    const userData = useSelector(state => state.auth.userData)
    const galleryImages = useSelector(state => state.gallery.galleryImages)

    const [currentImage, setCurrentImage] = useState(0)
    const [viewerIsOpen, setViewerIsOpen] = useState(false)
    const [photos, setphotos] = useState(false)

    useEffect(() => {
      dispatch(fetchAllGallery())
    }, [])

    const openLightbox = useCallback((event, { photo, index }) => {
      setCurrentImage(index)
      setViewerIsOpen(true)
    }, [])

    const closeLightbox = () => {
      setCurrentImage(0)
      setViewerIsOpen(false)
    }

  return (
    <Grid container spacing={2}>

        <Grid className="bg-white" item xs={12}>
          <h3 className="text-center my-2" style={{fontWeight: 'bold', fontSize: 38}}>Gallery</h3>
        </Grid>

        <Grid className="bg-white p-4" item xs={12}>
            <Gallery onClick={openLightbox} columns={3} photos={galleryImages.map(i => ({src: `${BASE_URL}uploads/${i.file}`, width: 4, height: 4}))} />
        </Grid>

        <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel
                currentIndex={currentImage}
                views={galleryImages.map(i => ({src: `${BASE_URL}uploads/${i.file}`, width: 4, height: 4})).map(x => ({
                  ...x,
                  srcset: x.srcSet,
                  caption: x.title
                }))}
              />
            </Modal>
          ) : null}
        </ModalGateway>

    </Grid>
  )
}

export default GalleryPage
