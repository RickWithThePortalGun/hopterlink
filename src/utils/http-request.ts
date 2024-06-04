import axios from 'axios'

const uri = 'https://0470-197-210-76-187.ngrok-free.app'

const Axios = axios.create({
  baseURL: uri
})

export default Axios
