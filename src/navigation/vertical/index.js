import { Image, Home, Settings, ChevronRight, Video, Sliders, Youtube } from 'react-feather'

const Navigation = [
  {
    id: 'home',
    title: 'Dashboard',
    icon: <Home size={20} />,
    navLink: '/dashboard'
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
    id: 'gallery',
    title: 'Gallery',
    icon: <Image size={20} />,
    navLink: '/admin/gallery'
  },
  {
    id: "cms",
    title: "CMS",
    type: "collapse",
    icon: <Sliders size={20} />,
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