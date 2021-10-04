import axios from 'axios'
import { BASE_URL } from './serverSettings'

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

  return (axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`, 
      "Content-Type": "application/json"
    },
    redirect: 'follow',
    ...props
  }))
}
export default ServerApi