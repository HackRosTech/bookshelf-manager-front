import axios from 'axios'
import {getItem} from '@/helpers/persistanceStorage'

axios.defaults.baseURL = 'http://bookshelf-manager.loc/api/v1/'

axios.interceptors.request.use(config => {
    const token = getItem('accessToken')
    const authorizisationToken = token ? `Bearer ${token}` : ''
    config.headers.Authorization = authorizisationToken
    return config
})

export default axios
