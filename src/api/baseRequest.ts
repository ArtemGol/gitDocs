import axios from "axios"

export const loginInstance = axios.create({
  baseURL: 'https://api.github.com/'
})
