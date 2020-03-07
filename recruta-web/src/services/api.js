import axios from 'axios';

export default axios.create({
    baseURL: "",
    crossDomain: true,
    responseType: "json"
});