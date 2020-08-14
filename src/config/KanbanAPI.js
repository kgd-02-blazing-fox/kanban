import axios from "axios"

export default axios.create({
  baseURL: 'https://kanbantasks-app.herokuapp.com/',
});