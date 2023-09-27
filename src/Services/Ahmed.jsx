import axios from 'axios'

const URL = "https://studies.cs.helsinki.fi/restcountries/api/all";


const getAll = () => axios.get(URL).then((Response) => Response.data);


export default {getAll}