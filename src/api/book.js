import axios from '@/api/axios'

const books = credentials => {
    return axios.get('/book/search', {
        params: {
            query: credentials
        }
    })
}

const getBook = id => {
    return axios.get(`/book/show/${id}`).then(response => response.data)
}

const createBook = bookInput => {
    console.log('createBook',bookInput)
    return axios
        .post('/book/create', bookInput,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => response.data.book)
}

const updateBook = (id, bookInput) => {
    console.log('updateBook',bookInput)
    return axios
        .post(`/book/update/${id}`, bookInput, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => response.data.book)
}

const getEditBook = id => {
    return axios.get(`/book/edit/${id}`).then(response => response.data.book)
}

const deleteBook = id => {
    return axios.delete(`/book/delete/${id}`)
}

export default {
    books,
    getBook,
    createBook,
    updateBook,
    getEditBook,
    deleteBook
}