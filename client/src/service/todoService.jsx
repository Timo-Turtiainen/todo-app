import axios from 'axios'

const baseURL = '/api/todos'

async function getAllTodos() {
  const request = axios.get(baseURL)
  const { data } = await request
  return data
}

async function createTodo(newTodo, token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const { data } = await axios.post(baseURL, newTodo, config)
  return data
}

async function updateTodo(todo, token) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const id = todo.user
  const todoObject = { ...todo, user: id }
  const { data } = await axios.put(`${baseURL}/${todo.id}`, todoObject, config)
  return data
}

async function deleteTodoByID(id, token) {
  console.log('service delete', token)
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }
  const { data } = await axios.delete(`${baseURL}/${id}`)
  return data
}
export default { getAllTodos, createTodo, updateTodo, deleteTodoByID }
