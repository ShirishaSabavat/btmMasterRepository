import { Image, Home, Settings, ChevronRight, Video, Sliders, Youtube, Users, CreditCard, FileText, MessageSquare, Briefcase } from 'react-feather'
import { getUserData } from '../../utility/Utils'

let Navigation = [
  {
    id: 'home',
    title: 'Dashboard',
    icon: <Home size={20} />,
    navLink: '/dashboard',
    permissions: ["ADMIN", "USER"]
  },
  {
    id: 'mycustomers',
    title: 'My Customers',
    icon: <Users size={20} />,
    navLink: '/admin/my-customers',
    permissions: ["ADMIN"]
  },
  {
    id: 'mycommission',
    title: 'My Commission',
    icon: <Briefcase size={20} />,
    navLink: '/admin/my-commission',
    permissions: ["ADMIN"]
  },
  {
    id: 'mypayouts',
    title: 'My Payouts',
    icon: <CreditCard size={20} />,
    navLink: '/admin/my-payouts',
    permissions: ["ADMIN"]
  },
  {
    id: 'myreports',
    title: 'My Reports',
    icon: <FileText size={20} />,
    navLink: '/admin/my-reports',
    permissions: ["ADMIN"]
  },
  {
    id: 'mymessages',
    title: 'My Messages',
    icon: <MessageSquare size={20} />,
    navLink: '/admin/my-messages',
    permissions: ["ADMIN"]
  },
  {
    id: 'courses',
    title: 'Courses',
    icon: <Video size={20} />,
    navLink: '/courses',
    permissions: ["ADMIN"]
  },
  {
    id: 'videos',
    title: 'Videos',
    icon: <Youtube size={20} />,
    navLink: '/videos',
    permissions: ["ADMIN"]
  },
  {
    id: 'gallery',
    title: 'Gallery',
    icon: <Image size={20} />,
    navLink: '/admin/gallery',
    permissions: ["ADMIN"]
  },
  {
    id: "cms",
    title: "CMS",
    type: "collapse",
    icon: <Sliders size={20} />,
    permissions: ["ADMIN"],
    children: [
      {
        id: "about",
        title: "About",
        type: "item",
        icon: <ChevronRight size={15} />,
        permissions: ["admin", "editor"],
        navLink: "/about-settings"
      },
      {
        id: "mission",
        title: "Mission",
        type: "item",
        icon: <ChevronRight size={15} />,
        permissions: ["admin", "editor"],
        navLink: "/mission-settings"
      },
      {
        id: "vission",
        title: "Vission",
        type: "item",
        icon: <ChevronRight size={15} />,
        permissions: ["admin", "editor"],
        navLink: "/vision-settings"
      },
      {
        id: "contact",
        title: "Contact",
        type: "item",
        icon: <ChevronRight size={15} />,
        permissions: ["admin", "editor"],
        navLink: "/contact-settings"
      },
      {
        id: "gallery",
        title: "Gallery",
        type: "collapse",
        icon: <Sliders size={20} />,
        permissions: ["ADMIN"],
        children: [
          {
            id: "imagespage",
            title: "Gallery Images Settings",
            type: "item",
            icon: <ChevronRight size={15} />,
            permissions: ["admin", "editor"],
            navLink: "/gallery-page-images-settings"
          },
          {
            id: "videospage",
            title: "Gallery Videos Settings",
            type: "item",
            icon: <ChevronRight size={15} />,
            permissions: ["admin", "editor"],
            navLink: "/gallery-videos-page-settings"
          }
        ]
      }
    ]
  },
  {
    id: "settings",
    title: "Settings",
    type: "collapse",
    icon: <Settings size={20} />,
    permissions: ["ADMIN"],
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

// let newNavigation = [...Navigation]
const user = getUserData()
if (user !== null) {
  Navigation = Navigation.filter(i => i.permissions.includes(user?.user?.role))
}

export default  Navigation