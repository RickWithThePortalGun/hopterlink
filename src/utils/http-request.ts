import axios from 'axios'

const uri = 'http://localhost:8000'

const Axios = axios.create({
  baseURL: uri
})

export default Axios
