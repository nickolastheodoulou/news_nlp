import axios from 'axios';

const baseUrl = 'https://murmuring-castle-67752.herokuapp.com'
const instance = axios.create({
  baseURL: baseUrl
});

// instance.defaults.headers.common['Authorization'] = 'auth token from instance'

export default instance
export { baseUrl }