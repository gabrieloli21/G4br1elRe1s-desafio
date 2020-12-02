import axios from 'axios';

//cria a requisição dos dados da api
const api = axios.create({
    baseURL: 'https://swapi.dev/api/films/'
});


export default api;