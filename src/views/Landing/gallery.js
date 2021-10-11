import { useState, useCallback } from 'react'
import { useSkin } from '@hooks/useSkin'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { Row, Col} from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import {Grid} from '@mui/material'
import { useSelector } from 'react-redux'
import NavBar from './components/navbar'
import Footer from './components/footer'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import Gallery from 'react-photo-gallery'
import Carousel, { Modal, ModalGateway } from "react-images"

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
    const history = useHistory()
    const [skin, setSkin] = useSkin()

    const userData = useSelector(state => state.auth.userData)

    const [currentImage, setCurrentImage] = useState(0)
    const [viewerIsOpen, setViewerIsOpen] = useState(false)

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
        <NavBar />

        <Grid className="bg-white" item xs={12}>
            <h2 className="text-center">Gallery</h2>
        </Grid>


        <Grid className="bg-white p-4" item xs={12}>
            <Gallery onClick={openLightbox} columns={3} photos={photos} />
        </Grid>

        <ModalGateway>
          {viewerIsOpen ? (
            <Modal onClose={closeLightbox}>
              <Carousel
                currentIndex={currentImage}
                views={photos.map(x => ({
                  ...x,
                  srcset: x.srcSet,
                  caption: x.title
                }))}
              />
            </Modal>
          ) : null}
        </ModalGateway>

        <Footer />

    </Grid>
  )
}

export default GalleryPage
