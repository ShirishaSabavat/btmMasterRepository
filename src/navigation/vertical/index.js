import { Mail, Home, Settings, ChevronRight, Video, Sliders, Youtube } from 'react-feather'

const Navigation = [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    id: 'secondPage',
    title: 'Second Page',
    icon: <Mail size={20} />,
    navLink: '/second-page'
  },
  {
    id: 'courses',
    title: 'Courses',
    icon: <Video size={20} />,
    navLink: '/courses'
  },
  {
    id: 'videos',
    title: 'Videos',
    icon: <Youtube size={20} />,
    navLink: '/videos'
  },
  {
    id: 'cms',
    title: 'CMS',
    icon: <Sliders size={20} />,
    navLink: '/cms'
  },
  {
    id: "settings",
    title: "Settings",
    type: "collapse",
    icon: <Settings size={20} />,
    children: [
      {
        id: "organization",
        title: "Organization",
        type: "item",
        icon: <ChevronRight size={15} />,
        permissions: ["admin", "editor"],
        navLink: "/general-settings"
      },
      {
        id: "faculty",
        title: "Faculty",
        type: "item",
        icon: <ChevronRight size={15} />,
        permissions: ["admin", "editor"],
        navLink: "/faculty-settings"
      }
    ]
  }
]

export default  Navigation