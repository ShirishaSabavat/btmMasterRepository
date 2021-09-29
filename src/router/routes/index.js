import HomeRoute from './HomeRoute'
import SettingsRoute from './SettingsRoute'
import CourseRoutes from "./CourseRoutes"
import CMSRoutes from './CMSRoutes'
import Videos from "./Videos"

// ** Document title
const TemplateTitle = '%s - ATS School Management'

// ** Default Route
const DefaultRoute = '/login'

// ** Merge Routes
const Routes = [
    ...HomeRoute,
    ...SettingsRoute,
    ...CourseRoutes,
    ...CMSRoutes,
    ...Videos
    ]

export { DefaultRoute, TemplateTitle, Routes }

