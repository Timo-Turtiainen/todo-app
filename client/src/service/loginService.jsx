import axios from 'axios'
const baseURL = '/api/login'

let token = null

function setToken(newToken) {
  token = `Bearer ${newToken}`
}

async function login(credentials) {
  const { data } = await axios.post(baseURL, credentials)
  return data
}

export default { login, setToken }
