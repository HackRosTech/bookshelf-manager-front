import authorApi from '@/api/author'

const state = {
    data: null,
    isLoading: false,
    error: null
}

export const mutationTypes = {
    getAuthorStart: '[author] Get author start',
    getAuthorSuccess: '[author] Get author success',
    getAuthorFailure: '[author] Get author failure',

    deleteAuthorStart: '[author] Delete author start',
    deleteAuthorSuccess: '[author] Delete author success',
    deleteAuthorFailure: '[author] Delete author failure'
}

export const actionTypes = {
    getAuthors: '[author] Get authors',
    getAuthor: '[author] Get author',
    deleteAuthor: '[author] Delete author'
}

const mutations = {
    [mutationTypes.getAuthorStart](state) {
        state.isLoading = true
        state.data = null
    },
    [mutationTypes.getAuthorSuccess](state, payload) {
        state.isLoading = false
        state.data = payload
    },
    [mutationTypes.getAuthorFailure](state) {
        state.isLoading = false
    },

    [mutationTypes.deleteAuthorStart]() {},
    [mutationTypes.deleteAuthorSuccess]() {},
    [mutationTypes.deleteAuthorFailure]() {}
}

const actions = {
    [actionTypes.getAuthors](context) {
        return new Promise(resolve => {
            context.commit(mutationTypes.getAuthorStart)
            authorApi
                .authors()
                .then(author => {
                    context.commit(mutationTypes.getAuthorSuccess, author.data.authors)
                    resolve(author)
                })
                .catch(() => {
                    context.commit(mutationTypes.getAuthorFailure)
                })
        })
    },

    [actionTypes.getAuthor](context, {id}) {
        return new Promise(resolve => {
            context.commit(mutationTypes.getAuthorStart)
            authorApi
                .getAuthor(id)
                .then(author => {
                    context.commit(mutationTypes.getAuthorSuccess, author.author)
                    resolve(author)
                })
                .catch(() => {
                    context.commit(mutationTypes.getAuthorFailure)
                })
        })
    },

    [actionTypes.deleteAuthor](context, {id}) {
        return new Promise(resolve => {
            context.commit(mutationTypes.deleteAuthorStart)
            authorApi
                .deleteAuthor(id)
                .then(() => {
                    context.commit(mutationTypes.deleteAuthorSuccess)
                    resolve()
                })
                .catch(() => {
                    context.commit(mutationTypes.deleteAuthorFailure)
                })
        })
    }
}

export default {
    state,
    actions,
    mutations
}

