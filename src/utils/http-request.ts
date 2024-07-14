import axios from "axios";

const uri = "https://hopterlink.up.railway.app";

const Axios = axios.create({
  baseURL: uri,
});

export default Axios;
