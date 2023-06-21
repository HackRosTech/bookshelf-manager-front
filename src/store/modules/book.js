import bookApi from '@/api/book'

const state = {
    data: null,
    isLoading: false,
    error: null
}

export const mutationTypes = {
    getBookStart: '[book] Get book start',
    getBookSuccess: '[book] Get book success',
    getBookFailure: '[book] Get book failure',

    deleteBookStart: '[book] Delete book start',
    deleteBookSuccess: '[book] Delete book success',
    deleteBookFailure: '[book] Delete book failure'
}

export const actionTypes = {
    getBooks: '[book] Get books',
    getBook: '[book] Get book',
    deleteBook: '[book] Delete book'
}

const mutations = {
    [mutationTypes.getBookStart](state) {
        state.isLoading = true
        state.data = null
    },
    [mutationTypes.getBookSuccess](state, payload) {
        console.log('book',payload)
        state.isLoading = false
        state.data = payload
    },
    [mutationTypes.getBookFailure](state) {
        state.isLoading = false
    },

    [mutationTypes.deleteBookStart]() {},
    [mutationTypes.deleteBookSuccess]() {},
    [mutationTypes.deleteBookFailure]() {}
}

const actions = {
    [actionTypes.getBooks](context, query) {
        return new Promise(resolve => {
            context.commit(mutationTypes.getBookStart)
            bookApi
                .books(query)
                .then(book => {
                    context.commit(mutationTypes.getBookSuccess, book.data.books.data)
                    resolve(book)
                })
                .catch(() => {
                    context.commit(mutationTypes.getBookFailure)
                })
        })
    },

    [actionTypes.getBook](context, {id}) {
        return new Promise(resolve => {
            context.commit(mutationTypes.getBookStart)
            bookApi
                .getBook(id)
                .then(book => {
                    context.commit(mutationTypes.getBookSuccess, book.book)
                    resolve(book)
                })
                .catch(() => {
                    context.commit(mutationTypes.getBookFailure)
                })
        })
    },

    [actionTypes.deleteBook](context, {id}) {
        return new Promise(resolve => {
            context.commit(mutationTypes.deleteBookStart)
            bookApi
                .deleteBook(id)
                .then(() => {
                    context.commit(mutationTypes.deleteBookSuccess)
                    resolve()
                })
                .catch(() => {
                    context.commit(mutationTypes.deleteBookFailure)
                })
        })
    }
}

export default {
    state,
    actions,
    mutations
}

