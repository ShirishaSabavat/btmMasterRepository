import axios from 'axios'

const getLoggedInUser = () => {
    const user = localStorage.getItem('userData')
    if (user) return JSON.parse(user)
    return null
}

function ServerApi(props) {
  let token = ''
  
  try {
    token = getLoggedInUser().access_token
  } catch (e) {
    token = ''
  }

  const baseURL = 'https://bac-api.amoghnya.com/'

  return (axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`, 
      "Content-Type": "application/json"
    },
    redirect: 'follow',
    ...props
  }))
}
export default ServerApi