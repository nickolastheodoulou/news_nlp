import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://murmuring-castle-67752.herokuapp.com'
});

// instance.defaults.headers.common['Authorization'] = 'auth token from instance'

export default instance