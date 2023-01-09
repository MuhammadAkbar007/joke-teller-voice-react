import axios from "axios"

const base_url = 'https://official-joke-api.appspot.com/jokes/programming/random'

export const fetchApi = () => axios.get(base_url)