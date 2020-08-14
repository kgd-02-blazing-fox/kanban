import axios from "axios"

export default axios.create({
  baseURL: 'https://kanbanserverapp.herokuapp.com',
});