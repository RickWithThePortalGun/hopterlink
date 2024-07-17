import axios from "axios";

const uri = "https://hopterlink.up.railway.app/"
console.log(uri)

const Axios = axios.create({
  baseURL: uri,
  headers: {
    "Content-Type": "application/json", // Set the content type header
    Accept: "application/json", // Set the accept header
    // Add any other headers you need here
  },
});

// If you need to add headers dynamically
Axios.interceptors.request.use(
  (config) => {
    // Modify the request configuration here if needed
    // For example, adding a token to the headers
    // config.headers['Authorization'] = 'Bearer your_token';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default Axios;
