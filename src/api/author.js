import axios from '@/api/axios'

const authors = credentials => {
    return axios.get('/author/index', credentials)
}

const getAuthor = id => {
    return axios.get(`/author/show/${id}`).then(response => response.data)
}

const createAuthor = sectionInput => {
    return axios
        .post('/author/create', sectionInput)
        .then(response => response.data.author)
}

const updateAuthor = (id, sectionInput) => {
    return axios
        .patch(`/author/update/${id}`, sectionInput)
        .then(response => response.data.author)
}

const getEditAuthor = id => {
    return axios.get(`/author/edit/${id}`).then(response => response.data.author)
}

const deleteAuthor = id => {
    return axios.delete(`/author/delete/${id}`)
}

export default {
    authors,
    getAuthor,
    createAuthor,
    updateAuthor,
    getEditAuthor,
    deleteAuthor
}