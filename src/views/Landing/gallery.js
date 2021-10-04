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

const itemData = [
    {
      img: '/assets/images/br3.jpg',
      title: 'Breakfast',
      rows: 2,
      cols: 2
    },
    {
      img: '/assets/images/br5.jpg',
      title: 'Burger'
    },
    {
      img: '/assets/images/br4.jpg',
      title: 'Camera'
    },
    {
      img: '/assets/images/w1.jpg',
      title: 'Coffee',
      cols: 2
    },
    {
      img: '/assets/images/w2.jpg',
      title: 'Coffee',
      rows: 2,
      cols: 2
    }
  ]

const Gallery = () => {
    const history = useHistory()
    const [skin, setSkin] = useSkin()

    const userData = useSelector(state => state.auth.userData)

    function srcset(image, size, rows = 1, cols = 1) {
        return {
          src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
          srcSet: `${image}?w=${size * cols}&h=${
            size * rows
          }&fit=crop&auto=format&dpr=2 2x`
        }
      }

  return (
    <Grid container spacing={2}>
        <NavBar />

        <Grid className="bg-white" item xs={12}>
            <h2 className="text-center">Gallery</h2>
        </Grid>

        <Grid className="bg-white" item xs={12}>
            <Row className=''>
                <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='12' xs='12'>
                    <ImageList
                        sx={{ margin: 'auto' }}
                        variant="quilted"
                        cols={4}
                        rowHeight={121}
                        >
                        {itemData.map((item) => (
                            <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                            <img
                                {...srcset(item.img, 121, item.rows, item.cols)}
                                alt={item.title}
                                loading="lazy"
                            />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Col>
            </Row>
        </Grid>

        <Footer />

    </Grid>
  )
}

export default Gallery
