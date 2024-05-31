import axios from 'axios'
const baseURL = '/api/login'

let token = null

function setToken(newToken) {
  token = `Bearer ${newToken}`
}

async function login(credentials) {
  console.log('login service', credentials)
  const { data } = await axios.post(baseURL, credentials)
  console.log('loginservice ', data)
  return data
}

export default { login, setToken }
