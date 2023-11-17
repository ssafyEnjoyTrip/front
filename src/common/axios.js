import axios from 'axios'
export default axios.create({
  baseURL: 'http://localhost:8080/',
  header: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // session 사용
})
