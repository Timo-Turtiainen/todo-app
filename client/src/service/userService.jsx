import axios from 'axios'

const baseURL = '/api/users'

async function createUser(newUser) {
  try {
    const { data } = await axios.post(baseURL, newUser)
    return data
  } catch (error) {
    throw error
  }
}

export default { createUser }
