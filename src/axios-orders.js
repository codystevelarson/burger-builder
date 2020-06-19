import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-f2325.firebaseio.com'
})

export default instance;