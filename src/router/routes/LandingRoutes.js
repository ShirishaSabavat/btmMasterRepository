import { lazy } from 'react'

// ** Merge Routes
const LandingRoute = [
    {
        path: '/home',
        component: lazy(() => import('../../views/Landing')),
        layout: 'BlankLayout',
        meta: {
          authRoute: true
        }
    }
]

export default LandingRoute