import AuthRoute from './AuthRoute'
import SettingsRoute from './SettingsRoute'
import CourseRoutes from "./CourseRoutes"
import CMSRoutes from './CMSRoutes'
import Videos from "./Videos"
import LandingRoute from './LandingRoutes'
import GalleryRoute from './GalleryRoute'

// ** Document title
const TemplateTitle = '%s - ATS School Management'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
    ...AuthRoute,
    ...SettingsRoute,
    ...CourseRoutes,
    ...CMSRoutes,
    ...Videos,
    ...LandingRoute,
    ...GalleryRoute
    ]

export { DefaultRoute, TemplateTitle, Routes }

