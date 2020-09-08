import axios from 'axios';
axios.defaults.headers = {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token')
}
const instance = axios.create({
    baseURL: 'https://flights.caduceuslane-digital.com/api',
});

// instance.interceptors.request...

export default instance;