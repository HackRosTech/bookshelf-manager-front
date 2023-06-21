import axios from '@/api/axios'

const sections = credentials => {
    return axios.get('/section/index', credentials)
}

const getSection = id => {
    return axios.get(`/section/show/${id}`).then(response => response.data)
}

const createSection = sectionInput => {
    return axios
        .post('/section/create', sectionInput)
        .then(response => response.data.section)
}

const updateSection = (id, sectionInput) => {
    return axios
        .patch(`/section/update/${id}`, sectionInput)
        .then(response => response.data.section)
}

const getEditSection = id => {
    return axios.get(`/section/edit/${id}`).then(response => response.data.section)
}

const deleteSection = id => {
    return axios.delete(`/section/delete/${id}`)
}

export default {
    sections,
    getSection,
    createSection,
    updateSection,
    getEditSection,
    deleteSection
}