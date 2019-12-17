import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}
const getUser = async (props) => {
    const response = await axios.get(`${baseUrl}/${props}`)
    return response.data
}

export default { getAll, getUser }
