import axios from 'axios';

const orderInstance = axios.create({
    baseURL: 'https://bb-burgerbuilder.firebaseio.com',
});

export default orderInstance;