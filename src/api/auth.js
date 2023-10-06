import axios from './axios'

const register = (credentials) => {
  return axios.post('/customer/signup', credentials)
}

const login = (credentials) => {
  return axios.post('/customer/signin', credentials)
}
 
export default {
  register, 
  login,
}